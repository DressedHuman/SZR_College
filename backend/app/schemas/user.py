from pydantic import BaseModel, EmailStr
from app.models.user import UserRole

class UserBase(BaseModel):
    email: EmailStr
    name: str

class UserCreate(UserBase):
    password: str
    role: UserRole = UserRole.student

class UserResponse(UserBase):
    id: int
    role: UserRole

    model_config = {"from_attributes": True}
