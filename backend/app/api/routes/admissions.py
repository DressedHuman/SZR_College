from typing import List, Optional
from fastapi import APIRouter, Depends, Query, HTTPException
from app.api.deps import SessionDep, RoleChecker
from app.models.user import UserRole
from app.models.admission import AdmissionStatus
from app.schemas.admission import AdmissionResponse, AdmissionCreate, AdmissionUpdate
from app.services.admission import AdmissionService

from app.core.limiter import limiter
from fastapi import Request

router = APIRouter()
admin_only = RoleChecker([UserRole.admin])

@router.post("/apply", response_model=AdmissionResponse)
@limiter.limit("3/hour")
async def apply_admission(request: Request, session: SessionDep, admission_in: AdmissionCreate):
    return await AdmissionService.create_admission(session, admission_in)

@router.get("/", response_model=List[AdmissionResponse], dependencies=[Depends(admin_only)])
async def get_admissions(
    session: SessionDep,
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1, le=100),
    status: Optional[AdmissionStatus] = None
):
    skip = (page - 1) * limit
    return await AdmissionService.get_admissions(session, skip=skip, limit=limit, status=status)

@router.put("/{admission_id}/status", response_model=AdmissionResponse, dependencies=[Depends(admin_only)])
async def update_admission_status(session: SessionDep, admission_id: int, admission_update: AdmissionUpdate):
    admission = await AdmissionService.update_status(session, admission_id, admission_update)
    if not admission:
        raise HTTPException(status_code=404, detail="Admission not found")
    return admission
