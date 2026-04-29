from typing import List, Optional
from fastapi import APIRouter, Depends, Query, HTTPException, status
from app.api.deps import SessionDep, RoleChecker
from app.models.user import UserRole
from app.schemas.notice import NoticeResponse, NoticeCreate
from app.services.notice import NoticeService

router = APIRouter()
admin_only = RoleChecker([UserRole.admin])

@router.get("/", response_model=List[NoticeResponse])
async def get_notices(
    session: SessionDep,
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1, le=100),
    category: Optional[str] = None
):
    skip = (page - 1) * limit
    return await NoticeService.get_notices(session, skip=skip, limit=limit, category=category)

@router.post("/", response_model=NoticeResponse, dependencies=[Depends(admin_only)])
async def create_notice(session: SessionDep, notice_in: NoticeCreate):
    return await NoticeService.create_notice(session, notice_in)

@router.get("/{notice_id}", response_model=NoticeResponse)
async def get_notice(session: SessionDep, notice_id: int):
    notice = await NoticeService.get_notice(session, notice_id)
    if not notice:
        raise HTTPException(status_code=404, detail="Notice not found")
    return notice

@router.put("/{notice_id}", response_model=NoticeResponse, dependencies=[Depends(admin_only)])
async def update_notice(session: SessionDep, notice_id: int, notice_in: NoticeCreate):
    notice = await NoticeService.update_notice(session, notice_id, notice_in)
    if not notice:
        raise HTTPException(status_code=404, detail="Notice not found")
    return notice

@router.delete("/{notice_id}", dependencies=[Depends(admin_only)])
async def delete_notice(session: SessionDep, notice_id: int):
    notice = await NoticeService.delete_notice(session, notice_id)
    if not notice:
        raise HTTPException(status_code=404, detail="Notice not found")
    return {"message": "Notice deleted"}
