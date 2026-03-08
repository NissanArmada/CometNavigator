from fastapi import APIRouter
from models import UserCreate, UserResponse
from firebase_auth import sign_up_user, send_verification_email

router = APIRouter()

@router.post("/register", response_model=UserResponse, status_code=201)
async def register_user(user: UserCreate):
    """
    Registers a new user with their UTD email and sends a verification email.
    """
    # 1. Sign up the user in Firebase
    user_data = await sign_up_user(user.email, user.password)
    
    # 2. Extract needed info
    uid = user_data.get("localId")
    id_token = user_data.get("idToken")
    
    # 3. Send verification email
    await send_verification_email(id_token)
    
    # 4. Return success response
    return UserResponse(
        uid=uid,
        email=user.email,
        email_verified=False
    )
