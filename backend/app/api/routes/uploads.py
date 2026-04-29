from fastapi import APIRouter, Depends, UploadFile, File
from app.api.deps import RoleChecker
from app.models.user import UserRole
from app.services.upload import UploadService

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
