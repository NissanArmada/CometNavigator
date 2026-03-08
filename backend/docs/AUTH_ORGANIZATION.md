# Auth Module Organization

The authentication system has been reorganized into a clean, modular structure under the `auth/` directory.

## Directory Structure

```
backend/
├── auth/                      # Authentication module
│   ├── __init__.py           # Module initialization
│   ├── schemas.py            # Pydantic models (UserCreate, UserResponse)
│   ├── firebase.py           # Firebase authentication functions
│   ├── router.py             # FastAPI router for auth endpoints
│   └── test.py               # Unit tests for auth endpoints
│
├── schemas/                   # Shared schemas module
│   ├── __init__.py
│   └── scraper.py            # Scraper credentials schema
│
├── routes/                    # Route handlers
│   ├── __init__.py
│   ├── auth.py               # (OLD - use auth/router.py instead)
│   └── scraper.py            # Scraper routes
│
├── main.py                    # FastAPI application setup
├── config.py                  # Configuration settings
├── database.py                # Database connection
├── exceptions.py              # Custom exception classes
└── ...other files
```

## Module Details

### `auth/schemas.py`
Contains Pydantic models for authentication:
- **UserCreate**: Request model for user registration (email, password)
- **UserResponse**: Response model after successful registration

### `auth/firebase.py`
Firebase authentication functions:
- `sign_up_user(email, password)`: Creates a new Firebase user
- `send_verification_email(id_token)`: Sends verification email to user

### `auth/router.py`
FastAPI router with auth endpoints:
- `POST /auth/register`: Register a new user with UTD email

### `auth/test.py`
Comprehensive test suite with 6 test cases:
- Invalid email formats
- Password validation
- Missing field validation
- Integration with Firebase

## Usage

### Import Auth Router
In `main.py`:
```python
from auth.router import router as auth_router
app.include_router(auth_router, prefix="/auth", tags=["auth"])
```

### Run Tests
```bash
cd backend
python auth/test.py
```

## Email Validation
The system validates UTD emails with the pattern:
- Format: `[3 letters][6 digits]@utdallas.edu`
- Example: `abc123456@utdallas.edu`

## Notes
- Old files (`firebase_auth.py`, `models.py`, `test_auth.py`) still exist in the backend root for backward compatibility
- Consider removing them after confirming all imports are updated
- All tests pass with proper validation and error handling
