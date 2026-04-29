import enum
from sqlalchemy import String, Enum
from sqlalchemy.orm import Mapped, mapped_column
from app.db.base import Base

class RoutineType(str, enum.Enum):
    class_routine = "class"
    exam_routine = "exam"

class Routine(Base):
    __tablename__ = "routines"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    type: Mapped[RoutineType] = mapped_column(Enum(RoutineType))
    file_url: Mapped[str] = mapped_column(String)
