from pydantic import BaseModel
from .user import UserResponse

class StudentBase(BaseModel):
    roll: str
    registration_no: str
    department: str

class StudentCreate(StudentBase):
    user_id: int

class StudentFullCreate(StudentBase):
    name: str
    email: str
    password: str

class StudentResponse(StudentBase):
    id: int
    user_id: int

    model_config = {"from_attributes": True}

class StudentWithUser(StudentResponse):
    user: UserResponse
