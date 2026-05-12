from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.models.site_content import SiteContent
from app.schemas.site_content import SiteContentUpdate


class SiteContentService:
    @staticmethod
    async def get(session: AsyncSession) -> SiteContent:
        result = await session.execute(select(SiteContent).where(SiteContent.id == 1))
        row = result.scalar_one_or_none()
        if row is None:
            row = SiteContent(id=1)
            session.add(row)
            await session.commit()
            await session.refresh(row)
        return row

    @staticmethod
    async def update(session: AsyncSession, data: SiteContentUpdate) -> SiteContent:
        result = await session.execute(select(SiteContent).where(SiteContent.id == 1))
        row = result.scalar_one_or_none()
        if row is None:
            row = SiteContent(id=1, **data.model_dump())
            session.add(row)
        else:
            for key, value in data.model_dump().items():
                setattr(row, key, value)
        await session.commit()
        await session.refresh(row)
        return row
