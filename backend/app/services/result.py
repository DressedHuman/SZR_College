from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.models.result import Result
from app.schemas.result import ResultCreate

class ResultService:
    @staticmethod
    async def get_results(session: AsyncSession, skip: int = 0, limit: int = 100, student_id: int = None):
        stmt = select(Result).offset(skip).limit(limit)
        if student_id is not None:
            stmt = stmt.where(Result.student_id == student_id)
        result = await session.execute(stmt)
        return result.scalars().all()

    @staticmethod
    async def get_result(session: AsyncSession, result_id: int):
        stmt = select(Result).where(Result.id == result_id)
        result = await session.execute(stmt)
        return result.scalar_one_or_none()

    @staticmethod
    async def create_result(session: AsyncSession, result_in: ResultCreate):
        db_result = Result(**result_in.model_dump())
        session.add(db_result)
        await session.commit()
        await session.refresh(db_result)
        return db_result

    @staticmethod
    async def update_result(session: AsyncSession, result_id: int, result_in: ResultCreate):
        db_result = await ResultService.get_result(session, result_id)
        if not db_result: return None
        for key, value in result_in.model_dump().items():
            setattr(db_result, key, value)
        await session.commit()
        await session.refresh(db_result)
        return db_result

    @staticmethod
    async def delete_result(session: AsyncSession, result_id: int):
        db_result = await ResultService.get_result(session, result_id)
        if db_result:
            await session.delete(db_result)
            await session.commit()
        return db_result
