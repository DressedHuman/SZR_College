from pydantic import BaseModel

class StudentBase(BaseModel):
    roll: str
    registration_no: str
    department: str

class StudentCreate(StudentBase):
    user_id: int

class StudentResponse(StudentBase):
    id: int
    user_id: int

    model_config = {"from_attributes": True}
