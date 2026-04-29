from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.models.admission import Admission, AdmissionStatus
from app.schemas.admission import AdmissionCreate, AdmissionUpdate

class AdmissionService:
    @staticmethod
    async def get_admissions(session: AsyncSession, skip: int = 0, limit: int = 100, status: AdmissionStatus = None):
        stmt = select(Admission).offset(skip).limit(limit)
        if status:
            stmt = stmt.where(Admission.status == status)
        result = await session.execute(stmt)
        return result.scalars().all()

    @staticmethod
    async def get_admission(session: AsyncSession, admission_id: int):
        stmt = select(Admission).where(Admission.id == admission_id)
        result = await session.execute(stmt)
        return result.scalar_one_or_none()

    @staticmethod
    async def create_admission(session: AsyncSession, admission_in: AdmissionCreate):
        db_admission = Admission(**admission_in.model_dump())
        session.add(db_admission)
        await session.commit()
        await session.refresh(db_admission)
        return db_admission

    @staticmethod
    async def update_status(session: AsyncSession, admission_id: int, admission_update: AdmissionUpdate):
        db_admission = await AdmissionService.get_admission(session, admission_id)
        if not db_admission: return None
        db_admission.status = admission_update.status
        await session.commit()
        await session.refresh(db_admission)
        return db_admission
