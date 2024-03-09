from pydantic import BaseModel

class Barrier_Post(BaseModel):
    username: str
    labeling: str
    description: str 
    isTemporary: bool
    lat: float
    lng: float
