from typing import List
from fastapi import APIRouter, Depends, HTTPException, Query, status
from app.api.deps import SessionDep, CurrentUser, RoleChecker
from app.models.user import UserRole
from app.schemas.student import StudentResponse, StudentCreate
from app.services.student import StudentService

router = APIRouter()
admin_only = RoleChecker([UserRole.admin])

@router.get("/me", response_model=StudentResponse)
async def get_my_student_profile(session: SessionDep, current_user: CurrentUser):
    """Get the student profile for the currently logged-in user"""
    student = await StudentService.get_student_by_user_id(session, current_user.id)
    if not student:
        raise HTTPException(status_code=404, detail="Student profile not found")
    return student

@router.get("/", response_model=List[StudentResponse], dependencies=[Depends(admin_only)])
async def get_students(session: SessionDep, page: int = Query(1, ge=1), limit: int = Query(10, ge=1, le=100)):
    skip = (page - 1) * limit
    return await StudentService.get_students(session, skip=skip, limit=limit)

@router.get("/{student_id}", response_model=StudentResponse, dependencies=[Depends(admin_only)])
async def get_student(session: SessionDep, student_id: int):
    student = await StudentService.get_student(session, student_id)
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")
    return student

@router.post("/", response_model=StudentResponse, dependencies=[Depends(admin_only)])
async def create_student(session: SessionDep, student_in: StudentCreate):
    return await StudentService.create_student(session, student_in)

@router.put("/{student_id}", response_model=StudentResponse, dependencies=[Depends(admin_only)])
async def update_student(session: SessionDep, student_id: int, student_in: StudentCreate):
    student = await StudentService.update_student(session, student_id, student_in)
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")
    return student

@router.delete("/{student_id}", dependencies=[Depends(admin_only)])
async def delete_student(session: SessionDep, student_id: int):
    student = await StudentService.delete_student(session, student_id)
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")
    return {"message": "Student deleted"}
