"""
Seed script to populate MongoDB with clubs from local JSON file.
Runs once to load clubs and store them with vector embeddings.

Usage:
    python scripts/seed_clubs.py
"""

import asyncio
import logging
import sys
import os
import json
from typing import List, Dict, Any
from pymongo import AsyncMongoClient

# Add parent directory to path for imports
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from config import settings
from onboarding.ml_service import generate_club_profile_text, compute_embedding

logger = logging.getLogger("cometnavigator.seed_clubs")
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)


async def load_clubs_from_json() -> List[Dict[str, Any]]:
    """
    Load clubs from local JSON file.
    
    Returns:
        List of club objects with id, name, and tags
    """
    json_path = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "clubs_data.json")
    
    logger.info(f"Loading clubs from {json_path}")
    
    try:
        with open(json_path, "r", encoding="utf-8") as f:
            clubs = json.load(f)
        logger.info(f"Successfully loaded {len(clubs)} clubs from JSON")
        return clubs
    except FileNotFoundError:
        logger.error(f"JSON file not found at {json_path}")
        raise
    except json.JSONDecodeError as e:
        logger.error(f"Invalid JSON format: {e}")
        raise
    except Exception as e:
        logger.error(f"Error loading clubs from JSON: {str(e)}")
        raise


async def generate_embeddings(clubs: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    """
    Generate vector embeddings for each club and add to club data.
    
    Args:
        clubs: List of club objects
    
    Returns:
        List of club objects with embeddings added
    """
    logger.info("Generating embeddings for clubs...")
    
    clubs_with_embeddings = []
    for i, club in enumerate(clubs):
        try:
            # Generate embedding for the club
            club_text = generate_club_profile_text(
                name=club.get("name", ""),
                description=club.get("description", ""),
                tags=club.get("tags", [])
            )
            embedding = compute_embedding(club_text).tolist()
            
            # Add embedding to club data
            club["embedding"] = embedding
            clubs_with_embeddings.append(club)
            
            if (i + 1) % 10 == 0:
                logger.info(f"Generated embeddings for {i + 1}/{len(clubs)} clubs")
        
        except Exception as e:
            logger.warning(f"Failed to generate embedding for club {club.get('id', 'unknown')}: {str(e)}")
            # Continue processing other clubs
            clubs_with_embeddings.append(club)
    
    logger.info(f"Completed embedding generation for {len(clubs_with_embeddings)} clubs")
    return clubs_with_embeddings


async def upsert_clubs_to_mongodb(clubs: List[Dict[str, Any]]) -> int:
    """
    Insert or update clubs in MongoDB using upsert based on club id.
    
    Args:
        clubs: List of club objects with embeddings
    
    Returns:
        Number of clubs processed
    """
    logger.info("Connecting to MongoDB...")
    
    try:
        client = AsyncMongoClient(settings.DATABASE_URL, serverSelectionTimeoutMS=5000)
        await client.admin.command("ping")
        logger.info("MongoDB connection successful")
        
        db = client[settings.DATABASE_NAME]
        clubs_collection = db["clubs"]
        
        # Create index on id field for efficient upserts
        await clubs_collection.create_index("id", unique=True)
        logger.info("Created index on clubs.id field")
        
        upserted_count = 0
        for i, club in enumerate(clubs):
            try:
                # Use upsert to avoid duplicates
                result = await clubs_collection.update_one(
                    {"id": club.get("id")},
                    {"$set": club},
                    upsert=True
                )
                
                if result.upserted_id or result.modified_count > 0:
                    upserted_count += 1
                
                if (i + 1) % 10 == 0:
                    logger.info(f"Upserted {i + 1}/{len(clubs)} clubs to MongoDB")
            
            except Exception as e:
                logger.warning(f"Failed to upsert club {club.get('id', 'unknown')}: {str(e)}")
                # Continue processing other clubs
        
        logger.info(f"Successfully upserted {upserted_count} clubs to MongoDB")
        
        await client.close()
        return upserted_count
    
    except Exception as e:
        logger.error(f"MongoDB error: {str(e)}")
        raise


async def main():
    """Main seed function - orchestrates the entire process"""
    try:
        logger.info("Starting club seeding process...")
        
        # Step 1: Load clubs from JSON
        clubs = await load_clubs_from_json()
        
        if not clubs:
            logger.warning("No clubs found in JSON file")
            return
        
        # Step 2: Generate embeddings
        clubs_with_embeddings = await generate_embeddings(clubs)
        
        # Step 3: Upsert to MongoDB
        upserted_count = await upsert_clubs_to_mongodb(clubs_with_embeddings)
        
        logger.info(f"✓ Club seeding completed successfully! ({upserted_count} clubs processed)")
    
    except Exception as e:
        logger.error(f"Club seeding failed: {str(e)}")
        sys.exit(1)


if __name__ == "__main__":
    asyncio.run(main())
