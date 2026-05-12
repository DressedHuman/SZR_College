from pydantic import BaseModel


class SiteContentResponse(BaseModel):
    college_name: str
    tagline: str
    hero_heading: str
    hero_subtext: str
    hero_image_url: str
    college_logo_url: str
    principal_name: str
    principal_designation: str
    principal_message: str
    principal_photo_url: str
    contact_email: str
    contact_phone: str
    address: str

    model_config = {"from_attributes": True}


class SiteContentUpdate(BaseModel):
    college_name: str
    tagline: str
    hero_heading: str
    hero_subtext: str
    hero_image_url: str
    college_logo_url: str
    principal_name: str
    principal_designation: str
    principal_message: str
    principal_photo_url: str
    contact_email: str
    contact_phone: str
    address: str
