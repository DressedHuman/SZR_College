from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import joinedload
from app.models.teacher import Teacher
from app.schemas.teacher import TeacherCreate

class TeacherService:
    @staticmethod
    async def get_teachers(session: AsyncSession, skip: int = 0, limit: int = 100, department: str = None):
        stmt = select(Teacher).options(joinedload(Teacher.user)).offset(skip).limit(limit)
        if department:
            stmt = stmt.where(Teacher.department == department)
        result = await session.execute(stmt)
        return result.scalars().all()

    @staticmethod
    async def get_teacher(session: AsyncSession, teacher_id: int):
        stmt = select(Teacher).options(joinedload(Teacher.user)).where(Teacher.id == teacher_id)
        result = await session.execute(stmt)
        return result.scalar_one_or_none()

    @staticmethod
    async def create_teacher(session: AsyncSession, teacher_in: TeacherCreate):
        db_teacher = Teacher(**teacher_in.model_dump())
        session.add(db_teacher)
        await session.commit()
        await session.refresh(db_teacher)
        return db_teacher

    @staticmethod
    async def update_teacher(session: AsyncSession, teacher_id: int, teacher_in: TeacherCreate):
        db_teacher = await TeacherService.get_teacher(session, teacher_id)
        if not db_teacher: return None
        for key, value in teacher_in.model_dump().items():
            setattr(db_teacher, key, value)
        await session.commit()
        await session.refresh(db_teacher)
        return db_teacher

    @staticmethod
    async def delete_teacher(session: AsyncSession, teacher_id: int):
        db_teacher = await TeacherService.get_teacher(session, teacher_id)
        if db_teacher:
            await session.delete(db_teacher)
            await session.commit()
        return db_teacher
