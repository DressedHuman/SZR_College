# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

SZR College is a full-stack institutional management system with a **Next.js frontend** (`/frontend`) and a **FastAPI backend** (`/backend`). The two services run independently and communicate over HTTP.

## Commands

### Frontend (`/frontend`)
```bash
npm run dev      # Dev server on :3000
npm run build    # Production build
npm run lint     # ESLint check
```

### Backend (`/backend`)
```bash
# Activate venv first
source venv/bin/activate

uvicorn app.main:app --reload              # Dev server on :8000
uvicorn app.main:app --host 0.0.0.0       # LAN access

# Database migrations
alembic upgrade head          # Apply all migrations
alembic revision --autogenerate -m "description"   # Generate new migration

# Tests
python tests_runner.py
```

### Environment
Frontend reads `NEXT_PUBLIC_API_URL` (defaults to `http://127.0.0.1:8000`).  
Backend reads from `backend/.env` — key variables: `SECRET_KEY`, `SQLALCHEMY_DATABASE_URI` (defaults to SQLite `szr_college.db`).

## Architecture

### Frontend (`/frontend/src/app`)

Uses **Next.js App Router**. Route groups:
- `/(site)/` — Public-facing pages (home, about, admission, notices, events, teachers, gallery)
- `/dashboard/` — Student-only portal (results, routine, profile, notices)
- `/admin/` — Admin-only panel (manage students, teachers, notices, results, site content)
- `/debug/` — Debug utilities

**Auth pattern**: `getSession()` in `app/lib/auth.ts` reads the `szr_token` cookie (JWT) server-side. Protected layouts call `getSession()` and redirect unauthenticated users. Role checks enforce `/dashboard` → student only, `/admin` → admin only, with cross-role redirects.

**API layer**: All backend calls go through typed fetch helpers in `app/lib/api.ts`. They attach `Authorization: Bearer <token>` from the cookie.

**Important note on Next.js version**: See `frontend/CLAUDE.md` — this version has breaking changes from training data. Read `node_modules/next/dist/docs/` for the actual API before writing new Next.js code.

### Backend (`/backend/app`)

Standard FastAPI layout:
- `api/routes/` — One file per resource (`auth`, `students`, `teachers`, `notices`, `results`, `events`, `admissions`, `uploads`)
- `core/` — `config.py` (Pydantic settings), `security.py` (JWT + bcrypt), `limiter.py` (slowapi rate limiting)
- `models/` — SQLAlchemy ORM models (async, SQLite via `aiosqlite`)
- `schemas/` — Pydantic request/response schemas
- `crud/` — Database operations

Route dependencies: `SessionDep` injects the async DB session; `CurrentUser` validates the JWT and returns the user. Admin-only routes check `current_user.role == "admin"`.

### Roles

| Role | Access |
|------|--------|
| `admin` | Full CRUD on all resources, admin panel |
| `teacher` | Limited read access |
| `student` | Own dashboard — results, routine, profile |

### Database

SQLite in development (`szr_college.db` at repo root). Managed with Alembic. Key tables: `users`, `students` (one-to-one with user), `teachers`, `notices`, `results`, `events`, `admissions`, `routine`.

### Key UI Stack

TailwindCSS v4, Shadcn/ui components (`/frontend/src/components/ui/`), Lucide icons. Admin panel uses a dark sidebar layout; student dashboard uses a light sidebar layout.
