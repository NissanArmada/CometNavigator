# Club Recommendation System - Architecture & Data Flow

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         FRONTEND (Next.js)                              │
│                                                                          │
│    ┌──────────────────────────────────────────────────────────────┐    │
│    │  Onboarding Form                                             │    │
│    │  ├─ Major Selector (CS, Business, Bio, etc.)               │    │
│    │  ├─ Belief Selector (Christian, Muslim, Hindu, etc.)       │    │
│    │  ├─ Nationality Selector (Indian, Hispanic, etc.)          │    │
│    │  └─ Hobbies Multi-select (Gaming, Coding, Music, etc.)    │    │
│    └──────────────────────────────────────────────────────────────┘    │
│                              ↓                                           │
│                      [Submit Survey]                                     │
└──────────────────────────────┬──────────────────────────────────────────┘
                               │
                               │ POST /api/onboarding/recommendations
                               │ {uid, major, belief, nationality, hobbies}
                               ↓
┌─────────────────────────────────────────────────────────────────────────┐
│                    FASTAPI BACKEND (main.py)                            │
│                                                                          │
│  ┌────────────────────────────────────────────────────────────────────┐ │
│  │                  Onboarding Router                                  │ │
│  │                                                                     │ │
│  │  POST /recommendations                                             │ │
│  │  └─> Validate UserSurveyResponse                                  │ │
│  │      └─> Fetch All Clubs from MongoDB                            │ │
│  │          └─> Generate User Embedding                              │ │
│  │              └─> Get Top 3 Matches                                │ │
│  │                  └─> Return RecommendationsResponse               │ │
│  └────────────────────────────────────────────────────────────────────┘ │
│                              ↓                                           │
│  ┌────────────────────────────────────────────────────────────────────┐ │
│  │                 ML Service (ml_service.py)                         │ │
│  │                                                                     │ │
│  │  Input: User Survey Data + Club Data                              │ │
│  │    ↓                                                                │ │
│  │  Text Formatting                                                    │ │
│  │  • User: "Major: CS. Belief: Christian. Nationality: Indian.      │ │
│  │           Hobbies: Gaming, Coding, Music."                         │ │
│  │  • Club: "Code Club. A community for developers.                   │ │
│  │           Tags: Programming, Tech, Development."                   │ │
│  │    ↓                                                                │ │
│  │  Embedding Generation                                              │ │
│  │  • Model: all-MiniLM-L6-v2 (sentence-transformers)               │ │
│  │  • User Embedding: [0.123, -0.456, ..., 0.789] (384D)           │ │
│  │  • Club Embeddings: [0.234, 0.567, ..., -0.123] (384D each)     │ │
│  │    ↓                                                                │ │
│  │  Similarity Calculation                                            │ │
│  │  • Cosine Similarity = (dot_product / (norm1 * norm2))           │ │
│  │  • Results: [(club_1, 0.856), (club_2, 0.743), (club_3, 0.621)] │ │
│  │    ↓                                                                │ │
│  │  Top-3 Ranking                                                     │ │
│  │  • Return highest scoring clubs                                   │ │
│  └────────────────────────────────────────────────────────────────────┘ │
│                              ↓                                           │
│  ┌────────────────────────────────────────────────────────────────────┐ │
│  │                   MongoDB Interaction                              │ │
│  │                                                                     │ │
│  │  1. Fetch Clubs                                                    │ │
│  │     • Query: db.clubs.find({})                                    │ │
│  │     • Returns all clubs with cached embeddings                    │ │
│  │                                                                     │ │
│  │  2. Update Embeddings (if missing)                                │ │
│  │     • Update: db.clubs.update_one({id}, {$set: {embedding}})    │ │
│  │     • Only updates clubs without embeddings                       │ │
│  └────────────────────────────────────────────────────────────────────┘ │
│                              ↓                                           │
│                   Return JSON Response                                   │
└──────────────────────────────┬──────────────────────────────────────────┘
                               │
                               │ {uid, recommendations[], message}
                               ↓
┌─────────────────────────────────────────────────────────────────────────┐
│                    FRONTEND (Results Page)                              │
│                                                                          │
│    ┌──────────────────────────────────────────────────────────────┐    │
│    │  Your Top 3 Club Recommendations                             │    │
│    │                                                               │    │
│    │  1. 🎮 Gaming Guild                              85.6% Match │    │
│    │     "Casual gaming and esports community"                   │    │
│    │     Tags: Gaming, Esports, Social                           │    │
│    │     [JOIN CLUB]                                              │    │
│    │                                                               │    │
│    │  2. 💻 Code Club                                 74.3% Match │    │
│    │     "Community for developers and coders"                    │    │
│    │     Tags: Programming, Tech, Development                    │    │
│    │     [JOIN CLUB]                                              │    │
│    │                                                               │    │
│    │  3. 🎵 Music Society                             62.1% Match │    │
│    │     "Musicians and music lovers of all genres"              │    │
│    │     Tags: Music, Arts, Performance                          │    │
│    │     [JOIN CLUB]                                              │    │
│    │                                                               │    │
│    │              [Browse All Clubs] [Try Again]                 │    │
│    └──────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────────┘


═══════════════════════════════════════════════════════════════════════════
                         DATABASE STRUCTURE
═══════════════════════════════════════════════════════════════════════════

MongoDB Collection: "clubs"
┌─────────────────────────────────────────────────────────────────────────┐
│ {                                                                        │
│   "_id": ObjectId("507f1f77bcf86cd799439011"),                         │
│   "id": "club_001",                                                      │
│   "name": "Code Club",                                                   │
│   "description": "A community for developers...",                        │
│   "tags": ["Programming", "Technology", "Development"],                │
│   "embedding": [                           ← Stored for fast lookups    │
│     0.123, -0.456, 0.789, ..., 0.234      ← 384 dimensions            │
│   ]                                        ← ~1.5KB per club            │
│ }                                                                        │
└─────────────────────────────────────────────────────────────────────────┘


═══════════════════════════════════════════════════════════════════════════
                      SEEDING SCRIPT FLOW
═══════════════════════════════════════════════════════════════════════════

SETUP (One-time):
python scripts/seed_clubs.py

Step 1: Fetch Clubs
  GET https://api.utdnebula.com/clubs/search
  Header: Authorization: Bearer {NEBULA_API_KEY}
  ↓
  Response: [{id, name, description, tags}, ...]

Step 2: Generate Embeddings
  For each club:
    • Format text: "{name}. {description}. Tags: {tags}."
    • Encode with sentence-transformers
    • Get 384D vector
    ↓
  All clubs now have embeddings

Step 3: Upsert to MongoDB
  For each club:
    • Update query: {id: club.id}
    • Upsert: true (create if not exists, update if does)
    • Result: clubs collection now has all clubs + embeddings

Idempotent: Safe to run multiple times
  • First run: Creates all club records
  • Second run: Updates existing records, doesn't duplicate


═══════════════════════════════════════════════════════════════════════════
                        API ENDPOINT SUMMARY
═══════════════════════════════════════════════════════════════════════════

POST /api/onboarding/recommendations

Request:
{
  "uid": "firebase_user_123",
  "major": "Computer Science",
  "belief": "Christian",
  "nationality": "Indian",
  "hobbies": ["Gaming", "Coding", "Music"]
}

Response (200 OK):
{
  "uid": "firebase_user_123",
  "recommendations": [
    {
      "id": "club_1",
      "name": "Code Club",
      "description": "A community for developers...",
      "tags": ["Programming", "Tech"],
      "similarity_score": 0.856
    },
    {
      "id": "club_2",
      "name": "Gaming Guild",
      "description": "Casual gaming community...",
      "tags": ["Gaming", "Fun"],
      "similarity_score": 0.743
    },
    {
      "id": "club_3",
      "name": "Music Society",
      "description": "Musicians and lovers...",
      "tags": ["Music", "Arts"],
      "similarity_score": 0.621
    }
  ],
  "message": "Top 3 club recommendations based on your profile"
}

Performance:
  • Time: 50-200ms (mostly database fetch)
  • Scaling: O(n) where n = number of clubs
  • Caching: Embeddings cached in MongoDB


═══════════════════════════════════════════════════════════════════════════
                      KEY TECHNOLOGIES USED
═══════════════════════════════════════════════════════════════════════════

Frontend:
  • Next.js (React)
  • TypeScript
  • Form handling & survey UI

Backend:
  • FastAPI (Python async web framework)
  • sentence-transformers (RoBERTa-based embeddings)
  • pymongo (async MongoDB driver)

ML/AI:
  • all-MiniLM-L6-v2 model (384D, RoBERTa)
  • Cosine similarity scoring
  • Semantic text matching

Database:
  • MongoDB (vector storage + caching)
  • Unique index on club ID field

APIs:
  • UTD Nebula API (club data source)
  • Firebase Auth (user management)


═══════════════════════════════════════════════════════════════════════════
```

## Quick Reference

### Important Files
- `onboarding/ml_service.py` - Core ML functions
- `onboarding/router.py` - API endpoint
- `onboarding/schemas.py` - Data validation
- `scripts/seed_clubs.py` - Data seeding script
- `test_ml_service.py` - Unit tests ✅
- `test_integration.py` - Integration tests ✅

### Key Environment Variables (Already Set)
- `NEBULA_API_URL` - Club data API
- `NEBULA_API_KEY` - API authentication
- `DATABASE_URL` - MongoDB connection
- `DATABASE_NAME` - Database name

### Commands
```bash
# Install dependencies
pip install -r requirements.txt

# Seed database (one-time)
python scripts/seed_clubs.py

# Run tests
python test_ml_service.py
python test_integration.py

# Start API
python main.py

# Access API docs
curl http://localhost:8000/docs
```
