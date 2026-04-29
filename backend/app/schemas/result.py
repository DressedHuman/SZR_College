from pydantic import BaseModel

class ResultBase(BaseModel):
    subject: str
    marks: float
    exam_type: str

class ResultCreate(ResultBase):
    student_id: int

class ResultResponse(ResultBase):
    id: int
    student_id: int

    model_config = {"from_attributes": True}
