from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.models.notice import Notice
from app.schemas.notice import NoticeCreate

class NoticeService:
    @staticmethod
    async def get_notices(session: AsyncSession, skip: int = 0, limit: int = 100, category: str = None):
        stmt = select(Notice).offset(skip).limit(limit)
        if category:
            stmt = stmt.where(Notice.category == category)
        result = await session.execute(stmt)
        return result.scalars().all()

    @staticmethod
    async def get_notice(session: AsyncSession, notice_id: int):
        stmt = select(Notice).where(Notice.id == notice_id)
        result = await session.execute(stmt)
        return result.scalar_one_or_none()

    @staticmethod
    async def create_notice(session: AsyncSession, notice_in: NoticeCreate):
        db_notice = Notice(**notice_in.model_dump())
        session.add(db_notice)
        await session.commit()
        await session.refresh(db_notice)
        return db_notice

    @staticmethod
    async def update_notice(session: AsyncSession, notice_id: int, notice_in: NoticeCreate):
        db_notice = await NoticeService.get_notice(session, notice_id)
        if not db_notice: return None
        for key, value in notice_in.model_dump().items():
            setattr(db_notice, key, value)
        await session.commit()
        await session.refresh(db_notice)
        return db_notice

    @staticmethod
    async def delete_notice(session: AsyncSession, notice_id: int):
        db_notice = await NoticeService.get_notice(session, notice_id)
        if db_notice:
            await session.delete(db_notice)
            await session.commit()
        return db_notice
