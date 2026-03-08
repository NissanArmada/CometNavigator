# CometNavigator Backend - Project Structure

## 📁 Directory Organization

```
backend/
├── 📂 auth/                          # Authentication module
│   ├── __init__.py
│   ├── schemas.py                   # Pydantic models for auth
│   ├── firebase.py                  # Firebase authentication
│   ├── router.py                    # FastAPI auth endpoints
│   └── test.py                      # Auth unit tests
│
├── 📂 onboarding/                    # Onboarding & recommendations
│   ├── __init__.py
│   ├── schemas.py                   # Survey & recommendation models
│   ├── ml_service.py                # ML embeddings & similarity
│   └── router.py                    # Recommendation endpoint
│
├── 📂 routes/                        # API route modules
│   ├── __init__.py
│   ├── auth.py                      # (legacy - use auth/ instead)
│   └── scraper.py                   # Scraper routes
│
├── 📂 schemas/                       # Shared schemas
│   ├── __init__.py
│   └── scraper.py                   # Scraper schemas
│
├── 📂 scripts/                       # Utility scripts
│   ├── __init__.py
│   └── seed_clubs.py                # Seed database with clubs
│
├── 📂 tests/                         # ⭐ Test suite
│   ├── __init__.py
│   ├── test_auth.py                 # Auth endpoint tests
│   ├── test_ml_service.py           # ML service unit tests
│   ├── test_complete_system.py      # Full system validation
│   ├── test_api_endpoint.py         # API endpoint tests
│   ├── test_endpoint_direct.py      # Direct endpoint test
│   ├── test_integration.py          # Integration tests
│   └── test_multi_user.py           # Multi-user scenario tests
│
├── 📂 utils/                         # ⭐ Utility scripts
│   ├── __init__.py
│   └── check_database.py            # Database health check
│
├── 📂 docs/                          # ⭐ Documentation
│   ├── __init__.py
│   ├── ARCHITECTURE.md              # System design & data flow
│   ├── AUTH_ORGANIZATION.md         # Auth module structure
│   ├── IMPLEMENTATION_SUMMARY.md    # Full implementation details
│   ├── RECOMMENDATIONS_GUIDE.md     # Recommendation system guide
│   ├── VERIFICATION_REPORT.md       # Test results
│   └── QUICKSTART.py                # Quick start examples
│
├── 🔧 Core Files (root level)
│   ├── main.py                      # FastAPI app entry point
│   ├── config.py                    # Configuration management
│   ├── database.py                  # MongoDB async client
│   ├── exceptions.py                # Custom exceptions
│   ├── models.py                    # Database models
│   ├── requirements.txt             # Python dependencies
│   ├── clubs_data.json              # Club data seed file
│   └── environment.yaml             # Environment config
```

## 🚀 Quick Start

### Run Tests
```bash
# Run all tests
python -m pytest tests/

# Run specific test
python tests/test_multi_user.py

# Run ML service tests
python tests/test_ml_service.py

# Check database
python utils/check_database.py
```

### Seed Database
```bash
python scripts/seed_clubs.py
```

### Start API Server
```bash
python main.py
```

## 📊 Module Breakdown

### Auth Module (`auth/`)
- User registration with Firebase
- UTD email validation (3 letters + 6 digits)
- Password validation

### Onboarding Module (`onboarding/`)
- User survey collection
- Club recommendations using ML embeddings
- Cosine similarity matching

### Tests (`tests/`)
- Comprehensive unit and integration tests
- 8 test categories covering all components
- Multi-user scenario testing

### Documentation (`docs/`)
- Architecture diagrams
- Implementation guides
- Quick start examples
- Verification reports

### Utils (`utils/`)
- Database connectivity checks
- Health monitoring scripts

## 🧪 Test Files Overview

| Test File | Purpose |
|-----------|---------|
| `test_auth.py` | Authentication endpoint validation |
| `test_ml_service.py` | Embedding generation & similarity scoring |
| `test_complete_system.py` | Full system validation (8 test categories) |
| `test_api_endpoint.py` | FastAPI endpoint testing |
| `test_endpoint_direct.py` | Direct endpoint function testing |
| `test_integration.py` | End-to-end integration tests |
| `test_multi_user.py` | Multi-user recommendation scenarios |

## 📝 Documentation Files

| Doc File | Content |
|----------|---------|
| `ARCHITECTURE.md` | System design, data flow, diagrams |
| `AUTH_ORGANIZATION.md` | Auth module structure & setup |
| `IMPLEMENTATION_SUMMARY.md` | Complete implementation details |
| `RECOMMENDATIONS_GUIDE.md` | Club recommendation system guide |
| `VERIFICATION_REPORT.md` | Full test results & metrics |
| `QUICKSTART.py` | Code examples & quick start |

## ✅ System Status

- ✅ Database: 583 clubs with embeddings
- ✅ ML Service: Sentence-transformers (384D vectors)
- ✅ Auth: Firebase integration
- ✅ Recommendations: Top-3 intelligent matching
- ✅ Tests: All passing
- ✅ Performance: ~94 embeddings/second

---

**Last Updated:** March 8, 2026  
**Status:** Production Ready 🚀
