"""
Quick test script to verify the onboarding recommendation system works
"""

import sys
import os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from onboarding.ml_service import (
    generate_user_profile_text,
    generate_club_profile_text,
    compute_embedding,
    get_top_club_matches,
)
import numpy as np

print("Testing ML Service Functions...")
print("=" * 50)

# Test 1: Generate user profile text
print("\n1. Testing user profile text generation:")
user_text = generate_user_profile_text(
    major="Computer Science",
    belief="Christian",
    nationality="Indian",
    hobbies=["Gaming", "Coding", "Music"]
)
print(f"   User profile: {user_text}")

# Test 2: Generate club profile text
print("\n2. Testing club profile text generation:")
club_text = generate_club_profile_text(
    name="Code Enthusiasts Club",
    description="A club for students passionate about coding and software development",
    tags=["Programming", "Tech", "Development"]
)
print(f"   Club profile: {club_text}")

# Test 3: Compute embeddings
print("\n3. Testing embedding generation:")
user_embedding = compute_embedding(user_text)
club_embedding = compute_embedding(club_text)
print(f"   User embedding shape: {user_embedding.shape}")
print(f"   Club embedding shape: {club_embedding.shape}")

# Test 4: Calculate similarity
print("\n4. Testing similarity calculation:")
from onboarding.ml_service import cosine_similarity
similarity = cosine_similarity(user_embedding, club_embedding)
print(f"   Similarity score: {similarity:.4f}")

# Test 5: Top club matches
print("\n5. Testing top club matches:")
test_clubs = [
    ("1", club_embedding),
    ("2", compute_embedding("Gaming Club. For students who love video games. Tags: Gaming, Fun")),
    ("3", compute_embedding("Business Club. Learn entrepreneurship. Tags: Business, Leadership")),
    ("4", compute_embedding("Music Club. Share your musical talents. Tags: Music, Arts")),
    ("5", compute_embedding("AI Club. Explore artificial intelligence and machine learning. Tags: AI, ML, Tech")),
]
top_matches = get_top_club_matches(user_embedding, test_clubs)
print(f"   Top matches: {top_matches}")

print("\n" + "=" * 50)
print("✓ All tests passed successfully!")
