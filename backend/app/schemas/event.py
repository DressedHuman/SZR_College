from pydantic import BaseModel
from datetime import datetime

class EventBase(BaseModel):
    title: str
    description: str
    date: datetime

class EventCreate(EventBase):
    pass

class EventResponse(EventBase):
    id: int

    model_config = {"from_attributes": True}
