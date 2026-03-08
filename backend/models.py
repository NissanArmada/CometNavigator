from pydantic import BaseModel, EmailStr, Field, field_validator
import re

class UserCreate(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=6, description="Custom password for the user")

    @field_validator('email')
    @classmethod
    def validate_utd_email(cls, v: str) -> str:
        # 3 letters, 6 numbers, @utdallas.edu
        pattern = r"^[a-zA-Z]{3}\d{6}@utdallas\.edu$"
        if not re.match(pattern, v):
            raise ValueError("Email must be a valid @utdallas.edu address (e.g., abc123456@utdallas.edu)")
        return v

class UserResponse(BaseModel):
    uid: str
    email: str
    email_verified: bool
    message: str = "User created successfully. Please check your email to verify your account."
