import asyncio
from pymongo import AsyncMongoClient
from config import settings


async def check_database():
    """Check if clubs are in MongoDB with embeddings"""
    try:
        client = AsyncMongoClient(settings.DATABASE_URL, serverSelectionTimeoutMS=5000)
        await client.admin.command("ping")
        print("✓ MongoDB connection successful")
        
        db = client[settings.DATABASE_NAME]
        clubs_collection = db["clubs"]
        
        # Count total clubs
        total_clubs = await clubs_collection.count_documents({})
        print(f"✓ Total clubs in database: {total_clubs}")
        
        # Check if any have embeddings
        clubs_with_embeddings = await clubs_collection.count_documents({"embedding": {"$exists": True}})
        print(f"✓ Clubs with embeddings: {clubs_with_embeddings}")
        
        # Get a sample club
        sample_club = await clubs_collection.find_one({})
        if sample_club:
            print(f"\n✓ Sample club found:")
            print(f"  - ID: {sample_club.get('id', 'N/A')}")
            print(f"  - Name: {sample_club.get('name', 'N/A')}")
            print(f"  - Tags: {sample_club.get('tags', [])}")
            if "embedding" in sample_club:
                embedding = sample_club["embedding"]
                if isinstance(embedding, list):
                    print(f"  - Embedding shape: {len(embedding)}D vector")
                else:
                    print(f"  - Embedding: present (type: {type(embedding).__name__})")
            else:
                print(f"  - Embedding: NOT FOUND")
        
        await client.close()
        print("\n✓ Database check complete!")
        
    except Exception as e:
        print(f"Error: {str(e)}")


if __name__ == "__main__":
    asyncio.run(check_database())
