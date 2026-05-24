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
pytest tests/test_api_security.py          # Pytest suite
python tests_runner.py                     # Seeds users + smoke-tests endpoints — requires uvicorn running on :8000
```

### Environment
Frontend reads `NEXT_PUBLIC_API_URL` (defaults to `http://127.0.0.1:8000`).  
Backend reads from `backend/.env` — key variables: `SECRET_KEY`, `SQLALCHEMY_DATABASE_URI` (defaults to SQLite `szr_college.db`).

## Architecture

### Frontend (`/frontend`)

Next.js **16.2.4** + React **19** App Router. No `src/` directory — app code lives at `frontend/app/`, shared modules at `frontend/lib/` and `frontend/components/`.

Route groups under `frontend/app/`:
- `(site)/` — Public-facing pages (home, about, admission, notices, events, teachers, gallery)
- `dashboard/` — Student-only portal (results, routine, profile, notices)
- `admin/` — Admin-only panel (manage students, teachers, notices, results, site content)
- `debug/` — Debug utilities

**Auth — two layers:**
1. `frontend/proxy.ts` is the Next.js middleware (Next 16 renamed `middleware.ts` → `proxy.ts`). It decodes the `szr_token` JWT *without verifying the signature* to enforce coarse routing: blocks unauthenticated access to `/dashboard` and `/admin`, redirects non-admins away from `/admin`, and bounces already-logged-in users off `/login`. Signature verification is the backend's job on every API call.
2. `frontend/lib/session.ts` / `frontend/lib/auth.ts` — server-side `getSession()` reads the cookie inside protected layouts for finer-grained checks and to surface user info to pages.

**API layer**: All backend calls go through typed fetch helpers in `frontend/lib/api.ts`. They attach `Authorization: Bearer <token>` from the cookie.

**Important note on Next.js version**: See `frontend/AGENTS.md`. Next 16 + React 19 has breaking changes from training data (e.g. `middleware.ts` → `proxy.ts`, async route params, new caching defaults). Read the relevant guide in `frontend/node_modules/next/dist/docs/` before writing new Next.js code.

### Backend (`/backend/app`)

Standard FastAPI layout:
- `api/routes/` — One file per resource (`auth`, `students`, `teachers`, `notices`, `results`, `events`, `admissions`, `uploads`)
- `core/` — `config.py` (Pydantic settings), `security.py` (JWT + bcrypt), `limiter.py` (slowapi rate limiting)
- `db/` — Async engine/session factory wiring
- `models/` — SQLAlchemy ORM models (async, SQLite via `aiosqlite`)
- `schemas/` — Pydantic request/response schemas
- `services/` — Business logic / cross-resource operations called from route handlers

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

TailwindCSS v4, Shadcn/ui components (`frontend/components/ui/`), Lucide icons, `@base-ui/react` primitives. Admin panel uses a dark sidebar layout; student dashboard uses a light sidebar layout.
