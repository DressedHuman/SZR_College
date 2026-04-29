from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.models.student import Student
from app.schemas.student import StudentCreate

class StudentService:
    @staticmethod
    async def get_students(session: AsyncSession, skip: int = 0, limit: int = 100):
        stmt = select(Student).offset(skip).limit(limit)
        result = await session.execute(stmt)
        return result.scalars().all()

    @staticmethod
    async def get_student(session: AsyncSession, student_id: int):
        stmt = select(Student).where(Student.id == student_id)
        result = await session.execute(stmt)
        return result.scalar_one_or_none()

    @staticmethod
    async def get_student_by_user_id(session: AsyncSession, user_id: int):
        stmt = select(Student).where(Student.user_id == user_id)
        result = await session.execute(stmt)
        return result.scalar_one_or_none()

    @staticmethod
    async def get_student_by_roll(session: AsyncSession, roll: str):
        stmt = select(Student).where(Student.roll == roll)
        result = await session.execute(stmt)
        return result.scalar_one_or_none()

    @staticmethod
    async def create_student(session: AsyncSession, student_in: StudentCreate):
        db_student = Student(**student_in.model_dump())
        session.add(db_student)
        await session.commit()
        await session.refresh(db_student)
        return db_student

    @staticmethod
    async def update_student(session: AsyncSession, student_id: int, student_in: StudentCreate):
        db_student = await StudentService.get_student(session, student_id)
        if not db_student: return None
        for key, value in student_in.model_dump().items():
            setattr(db_student, key, value)
        await session.commit()
        await session.refresh(db_student)
        return db_student

    @staticmethod
    async def delete_student(session: AsyncSession, student_id: int):
        db_student = await StudentService.get_student(session, student_id)
        if db_student:
            await session.delete(db_student)
            await session.commit()
        return db_student
