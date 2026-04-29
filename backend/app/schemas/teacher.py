from pydantic import BaseModel
from app.schemas.user import UserResponse

class TeacherBase(BaseModel):
    department: str
    designation: str

class TeacherCreate(TeacherBase):
    user_id: int

class TeacherResponse(TeacherBase):
    id: int
    user_id: int
    user: UserResponse

    model_config = {"from_attributes": True}
