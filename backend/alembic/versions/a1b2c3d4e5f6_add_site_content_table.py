"""Add site_content table

Revision ID: a1b2c3d4e5f6
Revises: 6c584a641512
Create Date: 2026-05-13 00:00:00.000000

"""
from typing import Sequence, Union
from alembic import op
import sqlalchemy as sa

revision: str = 'a1b2c3d4e5f6'
down_revision: Union[str, None] = '6c584a641512'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        'site_content',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('college_name', sa.String(), nullable=False, server_default='Shahid Ziaur Rahman College'),
        sa.Column('tagline', sa.Text(), nullable=False, server_default='Empowering Future Leaders through excellence in education, character building, and community service since 1991.'),
        sa.Column('hero_heading', sa.String(), nullable=False, server_default='Shahid Ziaur Rahman College'),
        sa.Column('hero_subtext', sa.Text(), nullable=False, server_default='Empowering Future Leaders through excellence in education, character building, and community service since 1991.'),
        sa.Column('hero_image_url', sa.String(), nullable=False, server_default=''),
        sa.Column('college_logo_url', sa.String(), nullable=False, server_default=''),
        sa.Column('principal_name', sa.String(), nullable=False, server_default='Prof. Dr. Zahirul Haque'),
        sa.Column('principal_designation', sa.String(), nullable=False, server_default='Principal, SZR College'),
        sa.Column('principal_message', sa.Text(), nullable=False, server_default="Our mission at SZR College is to nurture curiosity and foster integrity. We don't just teach curricula; we shape the visionary leaders of tomorrow's Bangladesh."),
        sa.Column('principal_photo_url', sa.String(), nullable=False, server_default=''),
        sa.Column('contact_email', sa.String(), nullable=False, server_default='info@szrcollege.edu'),
        sa.Column('contact_phone', sa.String(), nullable=False, server_default='+880-1234-567890'),
        sa.Column('address', sa.String(), nullable=False, server_default='Dimla, Nilphamari, Bangladesh'),
        sa.PrimaryKeyConstraint('id'),
    )


def downgrade() -> None:
    op.drop_table('site_content')
