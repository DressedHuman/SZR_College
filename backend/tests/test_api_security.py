import sys, os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

import pytest
import pytest_asyncio
import asyncio
from httpx import AsyncClient
from fastapi import Depends
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy.orm import sessionmaker

from app.main import create_app
from app.db.session import get_db
from app.db.base import Base
from app.models.user import User, UserRole
from app.core import security
from app.core.config import settings

# --- Test configuration ----------------------------------------------------
# Use an in‑memory SQLite database for isolation
TEST_DATABASE_URL = "sqlite+aiosqlite:///./test_szr_college.db"
engine = create_async_engine(TEST_DATABASE_URL, echo=False, future=True)
AsyncSessionLocal = async_sessionmaker(bind=engine, expire_on_commit=False)

# Override the get_db dependency to use the test session
async def override_get_db() -> AsyncSession:
    async with AsyncSessionLocal() as session:
        yield session

app = create_app()
app.dependency_overrides[get_db] = override_get_db

# ---------------------------------------------------------------------------
# Helper utilities
async def create_user(session: AsyncSession, email: str, password: str, role: UserRole) -> User:
    pwd_hash = security.get_password_hash(password)
    user = User(name=email.split('@')[0], email=email, password=pwd_hash, role=role)
    session.add(user)
    await session.commit()
    await session.refresh(user)
    return user

async def get_token(client: AsyncClient, email: str, password: str) -> str:
    response = await client.post(
        f"{settings.API_V1_STR}/auth/login",
        data={"username": email, "password": password},
    )
    assert response.status_code == 200, f"Login failed for {email}: {response.text}"
    return response.json()["access_token"]

# ---------------------------------------------------------------------------
@pytest_asyncio.fixture(scope="module")
async def async_client():
    # Create DB schema
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)
        await conn.run_sync(Base.metadata.create_all)
    from httpx import AsyncClient, ASGITransport
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://testserver") as client:
        yield client
    # Cleanup
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)

@pytest_asyncio.fixture(scope="module")
async def admin_token(async_client: AsyncClient):
    async with AsyncSessionLocal() as session:
        await create_user(session, "admin@example.com", "adminpass", UserRole.admin)
    token = await get_token(async_client, "admin@example.com", "adminpass")
    return token

@pytest_asyncio.fixture(scope="module")
async def student_token(async_client: AsyncClient):
    async with AsyncSessionLocal() as session:
        await create_user(session, "student@example.com", "studentpass", UserRole.student)
    token = await get_token(async_client, "student@example.com", "studentpass")
    return token

# ---------------------------- Security tests ------------------------------
@pytest.mark.asyncio
async def test_health_endpoint(async_client: AsyncClient):
    resp = await async_client.get("/health")
    assert resp.status_code == 200
    assert resp.json()["status"] == "ok"

# Example of an admin‑only endpoint – upload image (protected by admin_only)
@pytest.mark.asyncio
async def test_admin_only_upload_image_requires_admin(async_client: AsyncClient, student_token: str):
    # Try with student token – should be 403
    resp = await async_client.post(
        "/upload/image",
        files={"file": ("test.png", b"dummy", "image/png")},
        headers={"Authorization": f"Bearer {student_token}"},
    )
    assert resp.status_code == 403

@pytest.mark.asyncio
async def test_admin_can_upload_image(async_client: AsyncClient, admin_token: str, monkeypatch):
    # Stub the UploadService to avoid filesystem writes
    async def fake_save_image(file):
        return "http://example.com/fake.png"
    monkeypatch.setattr("app.services.upload.UploadService.save_image", fake_save_image)
    resp = await async_client.post(
        "/upload/image",
        files={"file": ("test.png", b"dummy", "image/png")},
        headers={"Authorization": f"Bearer {admin_token}"},
    )
    assert resp.status_code == 200
    assert resp.json()["url"] == "http://example.com/fake.png"

# Verify that public GET endpoints require authentication (CurrentUser) but not admin role
@pytest.mark.asyncio
async def test_student_can_list_notices(async_client: AsyncClient, student_token: str):
    resp = await async_client.get(
        "/notices/",
        headers={"Authorization": f"Bearer {student_token}"},
    )
    # Should succeed (200) even for a regular student
    assert resp.status_code == 200

@pytest.mark.asyncio
async def test_unauthenticated_cannot_access_protected(async_client: AsyncClient):
    resp = await async_client.get("/notices/")
    assert resp.status_code == 401
