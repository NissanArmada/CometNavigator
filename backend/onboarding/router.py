import logging
from fastapi import APIRouter, Depends
from pymongo.asynchronous.database import AsyncDatabase

from database import get_db
from onboarding.schemas import UserSurveyResponse, RecommendationsResponse, ClubRecommendation
from onboarding.ml_service import (
    generate_user_profile_text,
    generate_club_profile_text,
    compute_embedding,
    get_top_club_matches,
)

router = APIRouter()
logger = logging.getLogger("cometnavigator.onboarding")


@router.post("/recommendations", response_model=RecommendationsResponse, status_code=200)
async def get_club_recommendations(
    survey: UserSurveyResponse,
    db: AsyncDatabase = Depends(get_db)
):
    """
    Get top 3 club recommendations based on user's onboarding survey responses.
    
    Steps:
    1. Fetch all clubs from MongoDB
    2. Format user profile and club profiles into text strings
    3. Generate embeddings for user and clubs
    4. Calculate cosine similarity and return top 3 matches
    """
    try:
        # 1. Fetch all clubs from MongoDB
        clubs_collection = db["clubs"]
        clubs_cursor = clubs_collection.find({})
        clubs = await clubs_cursor.to_list(None)
        
        if not clubs:
            logger.warning("No clubs found in database")
            return RecommendationsResponse(
                uid=survey.uid,
                recommendations=[],
                message="No clubs available for recommendations"
            )
        
        # 2. Generate user profile text and embedding
        user_profile_text = generate_user_profile_text(
            major=survey.major,
            belief=survey.belief,
            nationality=survey.nationality,
            hobbies=survey.hobbies
        )
        user_embedding = compute_embedding(user_profile_text)
        logger.debug(f"Generated user embedding for UID: {survey.uid}")
        
        # 3. Generate club profile texts and fetch their embeddings from DB
        club_embeddings = []
        for club in clubs:
            club_id = str(club.get("_id", club.get("id")))
            
            # Check if embedding exists in database
            if "embedding" in club and club["embedding"]:
                # Embedding already stored in DB
                club_embedding = club["embedding"]
            else:
                # Generate embedding if not stored
                club_text = generate_club_profile_text(
                    name=club.get("name", ""),
                    description=club.get("description", ""),
                    tags=club.get("tags", [])
                )
                club_embedding = compute_embedding(club_text).tolist()
                
                # Store embedding in database for future use
                await clubs_collection.update_one(
                    {"_id": club["_id"]},
                    {"$set": {"embedding": club_embedding}},
                    upsert=True
                )
                logger.debug(f"Stored embedding for club: {club.get('name')}")
            
            club_embeddings.append((club_id, club_embedding))
        
        # 4. Get top 3 club matches
        top_matches = get_top_club_matches(user_embedding, club_embeddings)
        
        # 5. Build response with club details and similarity scores
        recommendations = []
        for club_id, similarity_score in top_matches:
            # Find the club details
            club = next((c for c in clubs if str(c.get("_id", c.get("id"))) == club_id), None)
            if club:
                recommendations.append(
                    ClubRecommendation(
                        id=club_id,
                        name=club.get("name", ""),
                        description=club.get("description", ""),
                        tags=club.get("tags", []),
                        similarity_score=round(similarity_score, 3)
                    )
                )
        
        logger.info(f"Generated {len(recommendations)} recommendations for UID: {survey.uid}")
        
        return RecommendationsResponse(
            uid=survey.uid,
            recommendations=recommendations
        )
    
    except Exception as e:
        logger.error(f"Error generating recommendations: {str(e)}")
        raise
