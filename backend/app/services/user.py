from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.models.user import User, UserRole
from app.schemas.user import UserCreate
from app.core import security

class UserService:
    @staticmethod
    async def get_users(session: AsyncSession, skip: int = 0, limit: int = 100):
        stmt = select(User).offset(skip).limit(limit)
        result = await session.execute(stmt)
        return result.scalars().all()

    @staticmethod
    async def get_user_by_email(session: AsyncSession, email: str):
        stmt = select(User).where(User.email == email)
        result = await session.execute(stmt)
        return result.scalar_one_or_none()

    @staticmethod
    async def create_user(session: AsyncSession, user_in: UserCreate):
        db_user = User(
            name=user_in.name,
            email=user_in.email,
            password=security.get_password_hash(user_in.password),
            role=user_in.role
        )
        session.add(db_user)
        await session.commit()
        await session.refresh(db_user)
        return db_user

    @staticmethod
    async def update_user(session: AsyncSession, user_id: int, user_in: UserCreate):
        stmt = select(User).where(User.id == user_id)
        result = await session.execute(stmt)
        db_user = result.scalar_one_or_none()
        if not db_user:
            return None
        
        db_user.name = user_in.name
        db_user.email = user_in.email
        if user_in.password:
            db_user.password = security.get_password_hash(user_in.password)
        db_user.role = user_in.role
        
        await session.commit()
        await session.refresh(db_user)
        return db_user

    @staticmethod
    async def delete_user(session: AsyncSession, user_id: int):
        stmt = select(User).where(User.id == user_id)
        result = await session.execute(stmt)
        db_user = result.scalar_one_or_none()
        if db_user:
            await session.delete(db_user)
            await session.commit()
        return db_user
