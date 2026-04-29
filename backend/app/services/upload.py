import os
import shutil
import uuid
from fastapi import UploadFile, HTTPException

UPLOAD_DIR = "uploads"
IMAGE_DIR = os.path.join(UPLOAD_DIR, "images")
FILE_DIR = os.path.join(UPLOAD_DIR, "files")

os.makedirs(IMAGE_DIR, exist_ok=True)
os.makedirs(FILE_DIR, exist_ok=True)

ALLOWED_IMAGE_EXTENSIONS = {"jpg", "jpeg", "png", "gif", "webp"}
ALLOWED_FILE_EXTENSIONS = {"pdf", "doc", "docx", "xls", "xlsx"}

class UploadService:
    @staticmethod
    def _get_extension(filename: str) -> str:
        return filename.split(".")[-1].lower() if "." in filename else ""

    @staticmethod
    async def save_image(file: UploadFile) -> str:
        ext = UploadService._get_extension(file.filename)
        if ext not in ALLOWED_IMAGE_EXTENSIONS:
            raise HTTPException(status_code=400, detail="Invalid image extension")
        
        filename = f"{uuid.uuid4()}.{ext}"
        filepath = os.path.join(IMAGE_DIR, filename)
        
        with open(filepath, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
            
        return f"/uploads/images/{filename}"

    @staticmethod
    async def save_file(file: UploadFile) -> str:
        ext = UploadService._get_extension(file.filename)
        if ext not in ALLOWED_FILE_EXTENSIONS:
            raise HTTPException(status_code=400, detail="Invalid file extension")
            
        filename = f"{uuid.uuid4()}.{ext}"
        filepath = os.path.join(FILE_DIR, filename)
        
        with open(filepath, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
            
        return f"/uploads/files/{filename}"
