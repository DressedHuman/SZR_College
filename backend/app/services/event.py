from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.models.event import Event
from app.schemas.event import EventCreate

class EventService:
    @staticmethod
    async def get_events(session: AsyncSession, skip: int = 0, limit: int = 100):
        stmt = select(Event).offset(skip).limit(limit)
        result = await session.execute(stmt)
        return result.scalars().all()

    @staticmethod
    async def get_event(session: AsyncSession, event_id: int):
        stmt = select(Event).where(Event.id == event_id)
        result = await session.execute(stmt)
        return result.scalar_one_or_none()

    @staticmethod
    async def create_event(session: AsyncSession, event_in: EventCreate):
        db_event = Event(**event_in.model_dump())
        session.add(db_event)
        await session.commit()
        await session.refresh(db_event)
        return db_event

    @staticmethod
    async def update_event(session: AsyncSession, event_id: int, event_in: EventCreate):
        db_event = await EventService.get_event(session, event_id)
        if not db_event: return None
        for key, value in event_in.model_dump().items():
            setattr(db_event, key, value)
        await session.commit()
        await session.refresh(db_event)
        return db_event

    @staticmethod
    async def delete_event(session: AsyncSession, event_id: int):
        db_event = await EventService.get_event(session, event_id)
        if db_event:
            await session.delete(db_event)
            await session.commit()
        return db_event
