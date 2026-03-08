from typing import Optional
from pydantic import BaseModel, Field, model_validator
import re

from exceptions import BadRequest


class UserCreate(BaseModel):
    email: str
    password: str
    netid: Optional[str] = ""

    @model_validator(mode="after")
    def validate_utd_email(self) -> "UserCreate":
        pattern = r"^[a-zA-Z]{3}\d{6}@utdallas\.edu$"
        if not re.match(pattern, self.email):
            raise BadRequest(
                "Email must be a valid @utdallas.edu address (e.g., abc123456@utdallas.edu)"
            )
        
        self.netid = self.email.split("@")[0]
        
        return self


class UserResponse(BaseModel):
    id: str = Field(alias="_id")
    email: str
    netid: str

    model_config = {"populate_by_name": True}
