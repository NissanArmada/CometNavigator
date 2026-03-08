from pydantic import BaseModel, field_validator

from exceptions import BadRequest

class ScraperCredentials(BaseModel):
    netid: str
    password: str
    
    @field_validator("netid")
    @classmethod
    def validate_netid(cls, val: str):
        if len(val) != 9:
            raise BadRequest("invalid netid")

        if not (val[:3].isalpha() and val[3:].isdigit()):
            raise BadRequest("invalid netid")
        
        return val