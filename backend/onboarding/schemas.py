from pydantic import BaseModel, Field
from typing import List


class UserSurveyResponse(BaseModel):
    uid: str = Field(..., description="User's Firebase UID")
    major: str = Field(..., description="Student's major")
    belief: str = Field(..., description="Student's religious/belief preference")
    nationality: str = Field(..., description="Student's nationality/ethnicity")
    hobbies: List[str] = Field(..., description="List of user's hobbies/interests")
    clubs: str = Field(..., description="Student's past clubs")
    work_preference: str = Field(..., description="Student's day/night work preference")
    goals: str = Field(..., description="Student's academic/personal goals")


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
