"""
Direct test of the recommendation endpoint without TestClient
"""
import asyncio
import sys
import os

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from onboarding.schemas import UserSurveyResponse, RecommendationsResponse
from onboarding.router import router
from database import connect_db, disconnect_db, get_db
from pymongo import AsyncMongoClient
from config import settings


async def test_recommendation_endpoint():
    """Test the recommendation endpoint directly"""
    print("=" * 70)
    print("DIRECT ENDPOINT TEST: POST /onboarding/recommendations")
    print("=" * 70 + "\n")
    
    try:
        # Connect to database
        print("[SETUP] Connecting to MongoDB...")
        await connect_db()
        print("✓ MongoDB connected\n")
        
        # Create test user
        test_user = UserSurveyResponse(
            uid="test_user_001",
            major="Computer Science",
            belief="Christian",
            nationality="Indian",
            hobbies=["Gaming", "Coding", "Music"]
        )
        
        print(f"[TEST] User Profile:")
        print(f"  - UID: {test_user.uid}")
        print(f"  - Major: {test_user.major}")
        print(f"  - Belief: {test_user.belief}")
        print(f"  - Nationality: {test_user.nationality}")
        print(f"  - Hobbies: {', '.join(test_user.hobbies)}\n")
        
        # Get database
        db_generator = get_db()
        db = await db_generator.__anext__()
        
        # Call the endpoint function directly
        print("[ENDPOINT] Calling recommendation engine...")
        from onboarding.router import get_club_recommendations
        
        response = await get_club_recommendations(test_user, db)
        
        print(f"✓ Received recommendations for {response.uid}\n")
        
        print("[RESULTS] Top 3 Club Recommendations:")
        print("-" * 70)
        
        for i, club in enumerate(response.recommendations, 1):
            similarity_percent = round(club.similarity_score * 100, 1)
            print(f"\n{i}. {club.name}")
            print(f"   Match Score: {similarity_percent}%")
            print(f"   Tags: {', '.join(club.tags)}")
            if club.description:
                desc = club.description[:60] + "..." if len(club.description) > 60 else club.description
                print(f"   Description: {desc}")
        
        print("\n" + "=" * 70)
        print("✓ TEST PASSED - Recommendations generated successfully!")
        print("=" * 70 + "\n")
        
        # Cleanup
        await disconnect_db()
        
    except Exception as e:
        print(f"\n✗ ERROR: {str(e)}")
        import traceback
        traceback.print_exc()
        sys.exit(1)


if __name__ == "__main__":
    asyncio.run(test_recommendation_endpoint())
