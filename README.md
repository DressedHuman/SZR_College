# SZR College

A full-stack institutional management platform for a college — a public marketing site, a student dashboard for results and routine, and an admin panel for managing notices, students, teachers, results, and site content.

Built as two independent services: a **Next.js 16 / React 19** frontend and a **FastAPI** backend, communicating over HTTP with JWT auth.

---

## Features

### Public site (`/`)
Marketing pages for prospective students and visitors:
- Home, About, Departments, Teachers, Gallery
- Notices and Events feeds
- Online admission application
- Login

### Student dashboard (`/dashboard`)
Authenticated portal for enrolled students:
- View published results and class routine
- Read notices targeted to students
- Profile management

### Admin panel (`/admin`)
Full operational control for staff:
- Manage students, teachers, notices, and results (CRUD)
- Edit live site content (about copy, departments, etc.) from the database
- Process admission applications
- Dark-themed layout with role-gated access

### Cross-cutting
- JWT auth in an HttpOnly cookie (`szr_token`) — verified server-side on every API call
- Middleware-level route gating in Next.js (admin routes blocked for non-admins, login skipped when already authenticated)
- Server-side rate limiting on auth and submission endpoints
- File uploads (gallery, profile images) handled by the backend with served static paths

---

## Tech stack

**Frontend** — Next.js 16.2.4 (App Router), React 19, TypeScript, TailwindCSS v4, shadcn/ui, @base-ui/react, Lucide icons

**Backend** — FastAPI, SQLAlchemy 2 (async), Alembic, Pydantic v2, aiosqlite, passlib[bcrypt], python-jose (JWT), slowapi (rate limiting)

**Database** — SQLite in development (Postgres-ready via SQLAlchemy)

---

## Project structure

```
.
├── frontend/                 # Next.js app
│   ├── app/                  # Route groups: (site), dashboard, admin, debug
│   ├── components/           # ui/, layout/, home/, dashboard/, admin/
│   ├── lib/                  # api.ts, auth.ts, session.ts
│   └── proxy.ts              # Next 16 middleware — JWT-based route gating
│
├── backend/                  # FastAPI app
│   ├── app/
│   │   ├── api/routes/       # auth, students, teachers, notices, results, events, admissions, uploads
│   │   ├── core/             # config, security (JWT + bcrypt), rate limiter
│   │   ├── db/               # async engine and session factory
│   │   ├── models/           # SQLAlchemy ORM models
│   │   ├── schemas/          # Pydantic request/response schemas
│   │   └── services/         # Cross-resource business logic
│   ├── alembic/              # Database migrations
│   └── tests/                # pytest suite
│
└── CLAUDE.md                 # Architecture notes for AI coding agents
```

---

## Local setup

### Prerequisites
- Node.js 20+
- Python 3.11+
- `npm` and `pip`

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate           # Windows: venv\Scripts\activate
pip install -r requirements.txt

# Configure environment
cp .env.example .env               # Then edit SECRET_KEY, etc.

# Apply migrations
alembic upgrade head

# Run dev server (http://127.0.0.1:8000)
uvicorn app.main:app --reload
```

### Frontend

```bash
cd frontend
npm install

# Optional: point at a non-default backend
echo 'NEXT_PUBLIC_API_URL=http://127.0.0.1:8000' > .env.local

# Run dev server (http://localhost:3000)
npm run dev
```

### Tests

```bash
# Backend
cd backend
source venv/bin/activate
pytest tests/test_api_security.py

# Frontend lint
cd frontend
npm run lint
```

---

## Environment variables

### Backend (`backend/.env`)
See `backend/.env.example` for the full template.

| Variable | Description | Default |
|---|---|---|
| `SECRET_KEY` | JWT signing key — **must be set in production** | insecure dev default |
| `ALGORITHM` | JWT algorithm | `HS256` |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | Access token lifetime | `30` |
| `REFRESH_TOKEN_EXPIRE_MINUTES` | Refresh token lifetime | `10080` (7 days) |
| `PROJECT_NAME` / `VERSION` / `API_V1_STR` | App metadata served on the root + docs routes | see config |

The SQLite URI is currently hardcoded in `app/core/config.py`. To target a different database, edit that file or convert `SQLALCHEMY_DATABASE_URI` into a settings field.

### Frontend (`frontend/.env.local`)
| Variable | Description | Default |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | Backend base URL | `http://127.0.0.1:8000` |

---

## Architecture notes

**Two-layer auth.** Next.js `proxy.ts` (the Next 16 successor to `middleware.ts`) decodes the JWT without verification to do coarse routing — blocking unauthenticated access to `/dashboard` and `/admin`, redirecting non-admins away from `/admin`, and bouncing logged-in users off `/login`. The backend then verifies the signature and role on every API request.

**Roles.**
| Role | Access |
|---|---|
| `admin` | Full CRUD on every resource and the admin panel |
| `teacher` | Limited read access |
| `student` | Personal dashboard — results, routine, notices, profile |

**Database.** SQLite for development, managed with Alembic. The schema is portable to Postgres by swapping `SQLALCHEMY_DATABASE_URI`.

---

## Deployment

The frontend is Vercel-ready (`next build`). The backend runs anywhere that supports ASGI — Fly.io, Render, Railway, or a VM with `uvicorn` behind nginx. Switch SQLite to Postgres for production by updating `SQLALCHEMY_DATABASE_URI` and running `alembic upgrade head` on the new database.
