from pydantic import BaseModel, Field
from typing import List


class UserSurveyResponse(BaseModel):
    """User responses from onboarding survey"""
    uid: str = Field(..., description="User's Firebase UID")
    major: str = Field(..., description="Student's major")
    belief: str = Field(..., description="Student's religious/belief preference")
    nationality: str = Field(..., description="Student's nationality/ethnicity")
    hobbies: List[str] = Field(..., description="List of user's hobbies/interests")


class ClubRecommendation(BaseModel):
    """A single club recommendation"""
    id: str
    name: str
    description: str
    tags: List[str]
    similarity_score: float = Field(..., description="Cosine similarity score (0-1)")


class RecommendationsResponse(BaseModel):
    """Response containing top 3 club recommendations"""
    uid: str
    recommendations: List[ClubRecommendation]
    message: str = "Top 3 club recommendations based on your profile"
