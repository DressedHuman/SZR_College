from sqlalchemy import String, Text
from sqlalchemy.orm import Mapped, mapped_column
from app.db.base import Base


class SiteContent(Base):
    __tablename__ = "site_content"

    id: Mapped[int] = mapped_column(primary_key=True)
    college_name: Mapped[str] = mapped_column(String, default="Shahid Ziaur Rahman College")
    tagline: Mapped[str] = mapped_column(Text, default="Empowering Future Leaders through excellence in education, character building, and community service since 1991.")
    hero_heading: Mapped[str] = mapped_column(String, default="Shahid Ziaur Rahman College")
    hero_subtext: Mapped[str] = mapped_column(Text, default="Empowering Future Leaders through excellence in education, character building, and community service since 1991.")
    hero_image_url: Mapped[str] = mapped_column(String, default="")
    college_logo_url: Mapped[str] = mapped_column(String, default="")
    principal_name: Mapped[str] = mapped_column(String, default="Prof. Dr. Zahirul Haque")
    principal_designation: Mapped[str] = mapped_column(String, default="Principal, SZR College")
    principal_message: Mapped[str] = mapped_column(Text, default="Our mission at SZR College is to nurture curiosity and foster integrity. We don't just teach curricula; we shape the visionary leaders of tomorrow's Bangladesh.")
    principal_photo_url: Mapped[str] = mapped_column(String, default="")
    contact_email: Mapped[str] = mapped_column(String, default="info@szrcollege.edu")
    contact_phone: Mapped[str] = mapped_column(String, default="+880-1234-567890")
    address: Mapped[str] = mapped_column(String, default="Dimla, Nilphamari, Bangladesh")
