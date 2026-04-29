from pydantic import BaseModel
from app.models.admission import AdmissionStatus

class AdmissionBase(BaseModel):
    first_name: str
    last_name: str
    email: str
    phone: str
    previous_school: str
    marks_obtained: float

class AdmissionCreate(AdmissionBase):
    pass

class AdmissionUpdate(BaseModel):
    status: AdmissionStatus

class AdmissionResponse(AdmissionBase):
    id: int
    status: AdmissionStatus

    class Config:
        from_attributes = True
