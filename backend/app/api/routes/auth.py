from datetime import timedelta
from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy import select

from app.api.deps import SessionDep, CurrentUser
from app.core import security
from app.core.config import settings
from app.models.user import User
from app.schemas.token import Token
from app.schemas.user import UserResponse

router = APIRouter()

@router.post("/login", response_model=Token)
async def login_access_token(
    session: SessionDep, 
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()]
):
    """OAuth2 compatible token login, get an access token for future requests"""
    stmt = select(User).where(User.email == form_data.username)
    result = await session.execute(stmt)
    user = result.scalar_one_or_none()
    
    if not user or not security.verify_password(form_data.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    refresh_token_expires = timedelta(minutes=settings.REFRESH_TOKEN_EXPIRE_MINUTES)
    
    return Token(
        access_token=security.create_access_token(user.id, role=user.role.value, expires_delta=access_token_expires),
        refresh_token=security.create_refresh_token(user.id, expires_delta=refresh_token_expires),
        token_type="bearer"
    )

@router.get("/me", response_model=UserResponse)
async def get_current_user_info(current_user: CurrentUser):
    """Get current user info"""
    return current_user
