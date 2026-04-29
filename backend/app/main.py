from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from app.core.config import settings
from app.api.routes import health
from app.api.routes import auth
from app.api.routes import notices
from app.api.routes import teachers
from app.api.routes import events
from app.api.routes import students
from app.api.routes import results
from app.api.routes import uploads
from app.api.routes import admissions

def create_app() -> FastAPI:
    app = FastAPI(
        title=settings.PROJECT_NAME,
        version=settings.VERSION,
        openapi_url=f"{settings.API_V1_STR}/openapi.json"
    )
    from fastapi.middleware.cors import CORSMiddleware

    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],  # Adjust in production
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

    app.include_router(health.router, tags=["health"])
    app.include_router(auth.router, prefix="/auth", tags=["auth"])
    
    app.include_router(notices.router, prefix="/notices", tags=["notices"])
    app.include_router(teachers.router, prefix="/teachers", tags=["teachers"])
    app.include_router(events.router, prefix="/events", tags=["events"])
    
    app.include_router(students.router, prefix="/students", tags=["students"])
    app.include_router(results.router, prefix="/results", tags=["results"])
    
    app.include_router(uploads.router, prefix="/upload", tags=["upload"])
    app.include_router(admissions.router, prefix="/admissions", tags=["admissions"])
    
    return app

app = create_app()
