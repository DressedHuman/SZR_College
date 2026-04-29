from typing import List, Optional
from fastapi import APIRouter, Depends, Query, HTTPException, status
from app.api.deps import SessionDep, RoleChecker
from app.models.user import UserRole
from app.schemas.teacher import TeacherResponse, TeacherCreate
from app.services.teacher import TeacherService

router = APIRouter()
admin_only = RoleChecker([UserRole.admin])

@router.get("/", response_model=List[TeacherResponse])
async def get_teachers(
    session: SessionDep,
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1, le=100),
    department: Optional[str] = None
):
    skip = (page - 1) * limit
    return await TeacherService.get_teachers(session, skip=skip, limit=limit, department=department)

@router.post("/", response_model=TeacherResponse, dependencies=[Depends(admin_only)])
async def create_teacher(session: SessionDep, teacher_in: TeacherCreate):
    return await TeacherService.create_teacher(session, teacher_in)

@router.get("/{teacher_id}", response_model=TeacherResponse)
async def get_teacher(session: SessionDep, teacher_id: int):
    teacher = await TeacherService.get_teacher(session, teacher_id)
    if not teacher:
        raise HTTPException(status_code=404, detail="Teacher not found")
    return teacher

@router.put("/{teacher_id}", response_model=TeacherResponse, dependencies=[Depends(admin_only)])
async def update_teacher(session: SessionDep, teacher_id: int, teacher_in: TeacherCreate):
    teacher = await TeacherService.update_teacher(session, teacher_id, teacher_in)
    if not teacher:
        raise HTTPException(status_code=404, detail="Teacher not found")
    return teacher

@router.delete("/{teacher_id}", dependencies=[Depends(admin_only)])
async def delete_teacher(session: SessionDep, teacher_id: int):
    teacher = await TeacherService.delete_teacher(session, teacher_id)
    if not teacher:
        raise HTTPException(status_code=404, detail="Teacher not found")
    return {"message": "Teacher deleted"}
