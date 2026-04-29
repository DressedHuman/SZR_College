import enum
from sqlalchemy import String, Enum, Float
from sqlalchemy.orm import Mapped, mapped_column
from app.db.base import Base

class AdmissionStatus(str, enum.Enum):
    pending = "pending"
    approved = "approved"
    rejected = "rejected"

class Admission(Base):
    __tablename__ = "admissions"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    first_name: Mapped[str] = mapped_column(String)
    last_name: Mapped[str] = mapped_column(String)
    email: Mapped[str] = mapped_column(String, index=True)
    phone: Mapped[str] = mapped_column(String)
    previous_school: Mapped[str] = mapped_column(String)
    marks_obtained: Mapped[float] = mapped_column(Float)
    status: Mapped[AdmissionStatus] = mapped_column(Enum(AdmissionStatus), default=AdmissionStatus.pending)
