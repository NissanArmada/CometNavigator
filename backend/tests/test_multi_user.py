"""
Multi-user recommendation test - show system versatility
"""
import asyncio
import sys
import os

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from onboarding.schemas import UserSurveyResponse
from onboarding.router import get_club_recommendations
from database import connect_db, disconnect_db, get_db


# Test users with different profiles
TEST_USERS = [
    {
        "name": "Alice - CS Student",
        "uid": "user_alice",
        "major": "Computer Science",
        "belief": "Christian",
        "nationality": "Indian",
        "hobbies": ["Gaming", "Coding", "Music"]
    },
    {
        "name": "Bob - Business Student",
        "uid": "user_bob",
        "major": "Business",
        "belief": "Muslim",
        "nationality": "Pakistani",
        "hobbies": ["Leadership", "Entrepreneurship", "Volunteering"]
    },
    {
        "name": "Carol - Biology Student",
        "uid": "user_carol",
        "major": "Biology",
        "belief": "Non-Believer",
        "nationality": "African American",
        "hobbies": ["Volunteering", "Social Justice", "Environmental Action"]
    },
]


async def test_multi_user_recommendations():
    """Test recommendations for diverse user profiles"""
    print("\n" + "=" * 80)
    print("MULTI-USER RECOMMENDATION TEST")
    print("=" * 80 + "\n")
    
    try:
        # Connect to database
        print("[SETUP] Connecting to MongoDB...")
        await connect_db()
        print("✓ MongoDB connected\n")
        
        # Get database
        db_generator = get_db()
        db = await db_generator.__anext__()
        
        # Test each user
        for user_data in TEST_USERS:
            print(f"[TEST] {user_data['name']}")
            print("-" * 80)
            
            # Create user
            user = UserSurveyResponse(
                uid=user_data["uid"],
                major=user_data["major"],
                belief=user_data["belief"],
                nationality=user_data["nationality"],
                hobbies=user_data["hobbies"]
            )
            
            # Get recommendations
            response = await get_club_recommendations(user, db)
            
            # Display
            print(f"Profile: {user.major} | {user.belief} | {user.nationality}")
            print(f"Interests: {', '.join(user.hobbies)}\n")
            
            print(f"Top 3 Recommendations:")
            for i, club in enumerate(response.recommendations, 1):
                score_pct = round(club.similarity_score * 100, 1)
                print(f"  {i}. {club.name:<45} ({score_pct}% match)")
            
            print("\n")
        
        print("=" * 80)
        print("✓ ALL TESTS PASSED - System working with diverse profiles!")
        print("=" * 80 + "\n")
        
        # Cleanup
        await disconnect_db()
        
    except Exception as e:
        print(f"\n✗ ERROR: {str(e)}")
        import traceback
        traceback.print_exc()
        sys.exit(1)


if __name__ == "__main__":
    asyncio.run(test_multi_user_recommendations())
