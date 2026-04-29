from pydantic import BaseModel
from app.models.routine import RoutineType

class RoutineBase(BaseModel):
    type: RoutineType
    file_url: str

class RoutineCreate(RoutineBase):
    pass

class RoutineResponse(RoutineBase):
    id: int

    model_config = {"from_attributes": True}
