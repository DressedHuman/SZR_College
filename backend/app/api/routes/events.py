from typing import List, Optional
from fastapi import APIRouter, Depends, Query, HTTPException, status
from app.api.deps import SessionDep, RoleChecker
from app.models.user import UserRole
from app.schemas.event import EventResponse, EventCreate
from app.services.event import EventService

router = APIRouter()
admin_only = RoleChecker([UserRole.admin])

@router.get("/", response_model=List[EventResponse])
async def get_events(
    session: SessionDep,
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1, le=100)
):
    skip = (page - 1) * limit
    return await EventService.get_events(session, skip=skip, limit=limit)

@router.post("/", response_model=EventResponse, dependencies=[Depends(admin_only)])
async def create_event(session: SessionDep, event_in: EventCreate):
    return await EventService.create_event(session, event_in)

@router.get("/{event_id}", response_model=EventResponse)
async def get_event(session: SessionDep, event_id: int):
    event = await EventService.get_event(session, event_id)
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    return event

@router.put("/{event_id}", response_model=EventResponse, dependencies=[Depends(admin_only)])
async def update_event(session: SessionDep, event_id: int, event_in: EventCreate):
    event = await EventService.update_event(session, event_id, event_in)
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    return event

@router.delete("/{event_id}", dependencies=[Depends(admin_only)])
async def delete_event(session: SessionDep, event_id: int):
    event = await EventService.delete_event(session, event_id)
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    return {"message": "Event deleted"}
