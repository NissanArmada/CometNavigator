from typing import Optional
from pydantic import BaseModel, Field, field_validator, model_validator
import re

from exceptions import BadRequest


class UserCreate(BaseModel):
    password: str
    netid: str
    email: Optional[str] = ""

    @model_validator(mode="after")
    @classmethod
    def validate_utd_email(cls, values: "UserCreate") -> "UserCreate":
        pattern = r"^[a-zA-Z]{3}\d{6}$"
        if not re.match(pattern, values.netid):
            raise BadRequest(
                "NetID must be in the format of 3 letters followed by 6 digits (e.g., abc123456)"
            )
        
        values.email = f"{values.netid}@utdallas.edu"

        return values


class UserResponse(BaseModel):
    id: str = Field(alias="_id")
    email: str
    netid: str

    model_config = {"populate_by_name": True}


class UserRequestVerify(BaseModel):
    email: str
    netid: Optional[str] = ""

    @model_validator(mode="after")
    def validate_utd_email(self) -> "UserRequestVerify":
        pattern = r"^[a-zA-Z]{3}\d{6}@utdallas\.edu$"
        if not re.match(pattern, self.email):
            raise BadRequest(
                "Email must be a valid @utdallas.edu address (e.g., abc123456@utdallas.edu)"
            )

        self.netid = self.email.split("@")[0]

        return self


class UserVerifyCode(BaseModel):
    email: str
    code: str

    @field_validator("email")
    @classmethod
    def validate_utd_email(cls, val: str):
        pattern = r"^[a-zA-Z]{3}\d{6}@utdallas\.edu$"
        if not re.match(pattern, val):
            raise BadRequest(
                "Email must be a valid @utdallas.edu address (e.g., abc123456@utdallas.edu)"
            )

        return val
