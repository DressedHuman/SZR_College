from sqlalchemy import String, Float, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.db.base import Base

class Result(Base):
    __tablename__ = "results"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    student_id: Mapped[int] = mapped_column(ForeignKey("students.id"), index=True)
    subject: Mapped[str] = mapped_column(String, index=True)
    marks: Mapped[float] = mapped_column(Float)
    exam_type: Mapped[str] = mapped_column(String, index=True)

    student: Mapped["Student"] = relationship(back_populates="results")
