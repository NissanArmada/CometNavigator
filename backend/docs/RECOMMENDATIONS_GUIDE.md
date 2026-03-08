# Club Recommendation System Documentation

## Overview
The club recommendation system uses semantic embeddings (RoBERTa via sentence-transformers) to match students to clubs based on their onboarding survey responses. Embeddings are generated once and stored in MongoDB for efficient future retrievals.

---

## Architecture

### 1. **Onboarding Module** (`backend/onboarding/`)

#### `schemas.py` - Pydantic Models
- **`UserSurveyResponse`**: Student survey data
  - `uid`: Firebase user ID
  - `major`: Student's major (e.g., "Computer Science")
  - `belief`: Religious/belief preference (e.g., "Christian", "Muslim", etc.)
  - `nationality`: Ethnicity/nationality (e.g., "Indian", "Hispanic", etc.)
  - `hobbies`: List of interests (e.g., ["Gaming", "Coding", "Music"])

- **`ClubRecommendation`**: A single recommended club
  - `id`: Club's unique ID
  - `name`: Club name
  - `description`: Club description
  - `tags`: Club categories
  - `similarity_score`: Cosine similarity (0-1)

- **`RecommendationsResponse`**: API response
  - `uid`: User's Firebase ID
  - `recommendations`: List of top 3 clubs
  - `message`: Status message

#### `ml_service.py` - Core ML Functions
- **`generate_user_profile_text()`**: Format survey responses into a single text string
  - Input: major, belief, nationality, hobbies
  - Output: `"Major: X. Belief: Y. Nationality: Z. Hobbies: A, B, C."`

- **`generate_club_profile_text()`**: Format club data into a single text string
  - Input: name, description, tags
  - Output: `"Club Name. Description text. Tags: tag1, tag2, tag3."`

- **`compute_embedding()`**: Generate 384-dimensional embedding using sentence-transformers
  - Model: `all-MiniLM-L6-v2` (lightweight, ~12MB)
  - Returns: numpy array (384D)

- **`cosine_similarity()`**: Calculate normalized similarity between embeddings
  - Input: Two numpy arrays
  - Output: Float between 0 and 1
  - Formula: `(dot_product / (norm1 * norm2)) + 1) / 2`

- **`get_top_club_matches()`**: Find top 3 most similar clubs
  - Input: User embedding, list of (club_id, embedding) tuples
  - Output: List of (club_id, similarity) tuples, sorted descending

#### `router.py` - FastAPI Endpoint

**POST `/api/onboarding/recommendations`**
```python
# Request Body (application/json)
{
  "uid": "user123",
  "major": "Computer Science",
  "belief": "Christian",
  "nationality": "Indian",
  "hobbies": ["Gaming", "Coding", "Music"]
}

# Response (200 OK)
{
  "uid": "user123",
  "recommendations": [
    {
      "id": "club_1",
      "name": "Code Club",
      "description": "For developers",
      "tags": ["Programming", "Tech"],
      "similarity_score": 0.856
    },
    {
      "id": "club_2",
      "name": "Gaming Guild",
      "description": "Casual gaming group",
      "tags": ["Gaming", "Fun"],
      "similarity_score": 0.743
    },
    {
      "id": "club_3",
      "name": "Music Society",
      "description": "Musicians and music lovers",
      "tags": ["Music", "Arts"],
      "similarity_score": 0.621
    }
  ],
  "message": "Top 3 club recommendations based on your profile"
}
```

**Process Flow:**
1. Accept user survey data
2. Fetch all clubs from MongoDB
3. Generate user embedding from survey text
4. For each club:
   - Check if embedding exists in DB, otherwise generate and store it
   - Collect (club_id, embedding) pair
5. Calculate cosine similarity between user and all clubs
6. Return top 3 matches with details and scores

---

### 2. **Seeding Script** (`backend/scripts/seed_clubs.py`)

**Purpose**: Fetch clubs from UTD Nebula API and populate MongoDB with embeddings

**Usage**:
```bash
cd backend
python scripts/seed_clubs.py
```

**Process**:
1. **Fetch**: GET from `https://api.utdnebula.com/clubs/search`
   - Header: `Authorization: Bearer {NEBULA_API_KEY}`
   - Expected response: `[{id, name, description, tags}, ...]`

2. **Generate Embeddings**: For each club
   - Format text: `"{name}. {description}. Tags: {tags}."`
   - Generate embedding using sentence-transformers
   - Convert to list for MongoDB storage

3. **Upsert to MongoDB**: For each club
   - Use upsert on `{"id": club.id}`
   - Stores: `id`, `name`, `description`, `tags`, `embedding`
   - No duplicate entries even if run multiple times

**Error Handling**:
- If API fetch fails → logs error and exits
- If embedding generation fails for a club → logs warning and continues
- If MongoDB upsert fails for a club → logs warning and continues

---

## Database Schema

### MongoDB Collection: `clubs`

```javascript
{
  "_id": ObjectId("..."),
  "id": "club_001",
  "name": "Code Club",
  "description": "A community for developers and coding enthusiasts",
  "tags": ["Programming", "Technology", "Development"],
  "embedding": [0.123, -0.456, 0.789, ...] // 384 values
}
```

**Indexes**:
- Unique index on `id` field (for efficient upserts)

---

## Installation & Setup

### 1. Install Dependencies
```bash
cd backend
pip install -r requirements.txt
```

Required new packages:
- `sentence-transformers==3.0.1` - Embedding generation
- `scikit-learn==1.5.1` - Vector math utilities
- `numpy==1.26.4` - Numerical operations

### 2. Seed the Database (One-time)
```bash
python scripts/seed_clubs.py
```

### 3. Run the API
```bash
python main.py
```

Server runs on `http://localhost:8000`

---

## Performance Characteristics

### Embedding Generation
- **Model**: all-MiniLM-L6-v2
- **Dimension**: 384D vectors
- **Speed**: ~500 texts/second on CPU
- **Storage**: ~1.5KB per embedding (384 floats × ~4 bytes)
- **Memory**: ~12MB model + runtime overhead

### Recommendation Lookup
- **Time Complexity**: O(n) where n = number of clubs
- **Typical latency**: 5-50ms for 100-1000 clubs (mostly embedding generation)
- **Database lookups**: 2 queries (fetch clubs, update embeddings if needed)

### Storage Requirements
- For 1000 clubs: ~1.5MB for embeddings
- For 10,000 clubs: ~15MB for embeddings

---

## Example Usage Flow

### 1. User Completes Onboarding
Student fills out survey on frontend

### 2. Frontend Sends Survey Data
```bash
POST http://localhost:8000/api/onboarding/recommendations
Content-Type: application/json

{
  "uid": "firebase_user_123",
  "major": "Computer Science",
  "belief": "Non-Believing",
  "nationality": "Hispanic",
  "hobbies": ["Volunteering", "Physical Activity"]
}
```

### 3. Backend Processes
- Generates user embedding
- Compares to all club embeddings
- Returns top 3 matches

### 4. Frontend Displays
Shows user the 3 recommended clubs with match percentages

---

## Configuration

Required environment variables in `.env`:

```env
# Existing
DATABASE_URL=mongodb+srv://...
DATABASE_NAME=CometNavigator

# New (already in your .env)
NEBULA_API_URL=https://api.utdnebula.com/
NEBULA_API_KEY=your_api_key
```

---

## Testing

### Unit Test - ML Service
```bash
python test_ml_service.py
```

Verifies:
- Text generation functions
- Embedding generation
- Similarity calculations
- Top-3 ranking

### Integration Test - Full Endpoint
```bash
curl -X POST http://localhost:8000/api/onboarding/recommendations \
  -H "Content-Type: application/json" \
  -d '{
    "uid": "test123",
    "major": "Computer Science",
    "belief": "Christian",
    "nationality": "Indian",
    "hobbies": ["Gaming", "Coding"]
  }'
```

---

## Troubleshooting

### Issue: "No clubs found in database"
**Solution**: Run `python scripts/seed_clubs.py` first

### Issue: "Sentence-transformers model not loaded"
**Solution**: Ensure `sentence-transformers` is installed: `pip install sentence-transformers`

### Issue: "NEBULA_API_KEY not found"
**Solution**: Add to `.env`: `NEBULA_API_KEY=your_key`

### Issue: Embedding generation is slow on first run
**Solution**: Normal - model downloads (~100MB) and generates embeddings for all clubs. Subsequent requests use cached embeddings from MongoDB.

---

## Future Enhancements

1. **Caching**: Cache embeddings in-memory with TTL for frequently accessed clubs
2. **Batch Processing**: Pre-compute and cache all user-club similarities daily
3. **Personalization**: Track which recommendations users join and improve matching
4. **A/B Testing**: Test different embedding models and similarity metrics
5. **Real-time Updates**: Stream new club recommendations as clubs are added
6. **Filtering**: Allow users to exclude certain club types before ranking

---

## File Structure
```
backend/
├── onboarding/
│   ├── __init__.py
│   ├── schemas.py          # Pydantic models
│   ├── ml_service.py       # Core ML functions
│   └── router.py           # FastAPI endpoint
├── scripts/
│   ├── __init__.py
│   └── seed_clubs.py       # Club seeding script
├── test_ml_service.py      # ML service test
├── main.py                 # Updated with onboarding router
└── requirements.txt        # Updated with ML dependencies
```
