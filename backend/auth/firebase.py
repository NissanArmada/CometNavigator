import httpx
from config import settings
from exceptions import BadRequest

# Firebase REST API endpoints
IDENTITY_TOOLKIT_BASE_URL = "https://identitytoolkit.googleapis.com/v1"


async def sign_up_user(email: str, password: str) -> dict:
    """
    Registers a new user with Firebase Authentication using email and password.
    Returns the user data including the idToken.
    """
    url = f"{IDENTITY_TOOLKIT_BASE_URL}/accounts:signUp?key={settings.FIREBASE_API_KEY}"
    payload = {
        "email": email,
        "password": password,
        "returnSecureToken": True
    }
    
    async with httpx.AsyncClient() as client:
        response = await client.post(url, json=payload)
        
    data = response.json()
    
    if response.status_code != 200:
        error_message = data.get("error", {}).get("message", "An unknown error occurred during sign up.")
        if error_message == "EMAIL_EXISTS":
            raise BadRequest(detail="The email address is already in use by another account.")
        raise BadRequest(detail=error_message)
        
    return data


async def send_verification_email(id_token: str) -> dict:
    """
    Sends a verification email to the user using their idToken.
    """
    url = f"{IDENTITY_TOOLKIT_BASE_URL}/accounts:sendOobCode?key={settings.FIREBASE_API_KEY}"
    payload = {
        "requestType": "VERIFY_EMAIL",
        "idToken": id_token
    }
    
    async with httpx.AsyncClient() as client:
        response = await client.post(url, json=payload)
        
    data = response.json()
    
    if response.status_code != 200:
        error_message = data.get("error", {}).get("message", "An unknown error occurred while sending the verification email.")
        raise BadRequest(detail=error_message)
        
    return data
