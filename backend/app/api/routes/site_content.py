from fastapi import APIRouter, Depends
from app.api.deps import SessionDep, RoleChecker
from app.models.user import UserRole
from app.schemas.site_content import SiteContentResponse, SiteContentUpdate
from app.services.site_content import SiteContentService

router = APIRouter()
admin_only = RoleChecker([UserRole.admin])


@router.get("/", response_model=SiteContentResponse)
async def get_site_content(session: SessionDep):
    return await SiteContentService.get(session)


@router.put("/", response_model=SiteContentResponse, dependencies=[Depends(admin_only)])
async def update_site_content(session: SessionDep, data: SiteContentUpdate):
    return await SiteContentService.update(session, data)
