from typing import List
from fastapi import APIRouter, Depends, HTTPException, Query, status
from app.api.deps import SessionDep, CurrentUser, RoleChecker
from app.models.user import UserRole
from app.schemas.result import ResultResponse, ResultCreate
from app.services.result import ResultService
from app.services.student import StudentService

router = APIRouter()
admin_only = RoleChecker([UserRole.admin])

@router.get("/me", response_model=List[ResultResponse])
async def get_my_results(
    session: SessionDep,
    current_user: CurrentUser,
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1, le=100)
):
    """Get results for the currently logged-in student"""
    student = await StudentService.get_student_by_user_id(session, current_user.id)
    if not student:
        raise HTTPException(status_code=404, detail="Student profile not found")
    skip = (page - 1) * limit
    return await ResultService.get_results(session, skip=skip, limit=limit, student_id=student.id)

@router.get("/", response_model=List[ResultResponse])
async def get_results(
    session: SessionDep,
    current_user: CurrentUser,
    roll: str = Query(..., description="Student roll number"),
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1, le=100)
):
    # Retrieve the student by roll directly via the service
    student = await StudentService.get_student_by_roll(session, roll)
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")
        
    # Validation logic: Students can only view their own results
    if current_user.role == UserRole.student:
        if student.user_id != current_user.id:
            raise HTTPException(status_code=403, detail="Not authorized to view these results")

    skip = (page - 1) * limit
    return await ResultService.get_results(session, skip=skip, limit=limit, student_id=student.id)

@router.post("/", response_model=ResultResponse, dependencies=[Depends(admin_only)])
async def add_result(session: SessionDep, result_in: ResultCreate):
    return await ResultService.create_result(session, result_in)

@router.put("/{result_id}", response_model=ResultResponse, dependencies=[Depends(admin_only)])
async def update_result(session: SessionDep, result_id: int, result_in: ResultCreate):
    result = await ResultService.update_result(session, result_id, result_in)
    if not result:
         raise HTTPException(status_code=404, detail="Result not found")
    return result

@router.delete("/{result_id}", dependencies=[Depends(admin_only)])
async def delete_result(session: SessionDep, result_id: int):
    result = await ResultService.delete_result(session, result_id)
    if not result:
         raise HTTPException(status_code=404, detail="Result not found")
    return {"message": "Result deleted"}
