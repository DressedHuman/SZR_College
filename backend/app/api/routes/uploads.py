import os
from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
from fastapi.responses import FileResponse
from app.api.deps import RoleChecker, CurrentUser
from app.models.user import UserRole
from app.services.upload import UploadService, IMAGE_DIR, FILE_DIR

router = APIRouter()
admin_only = RoleChecker([UserRole.admin])

@router.post("/image", dependencies=[Depends(admin_only)])
async def upload_image(file: UploadFile = File(...)):
    url = await UploadService.save_image(file)
    return {"url": url}

@router.post("/file", dependencies=[Depends(admin_only)])
async def upload_file(file: UploadFile = File(...)):
    url = await UploadService.save_file(file)
    return {"url": url}

@router.get("/images/{filename}")
async def get_image(filename: str):
    """Publicly serve images for notices and profiles"""
    filepath = os.path.join(IMAGE_DIR, filename)
    if not os.path.exists(filepath):
        raise HTTPException(status_code=404, detail="Image not found")
    return FileResponse(filepath)

@router.get("/files/{filename}", dependencies=[Depends(admin_only)])
async def get_file(filename: str):
    """Only admins can view uploaded documents (e.g. admission docs)"""
    filepath = os.path.join(FILE_DIR, filename)
    if not os.path.exists(filepath):
        raise HTTPException(status_code=404, detail="File not found")
    return FileResponse(filepath)
