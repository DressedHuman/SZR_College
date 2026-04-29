from pydantic import BaseModel

class TeacherBase(BaseModel):
    department: str
    designation: str

class TeacherCreate(TeacherBase):
    user_id: int

class TeacherResponse(TeacherBase):
    id: int
    user_id: int

    model_config = {"from_attributes": True}
