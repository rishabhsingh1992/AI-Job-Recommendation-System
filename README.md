# AI Job Recommendation System

A full-stack application for generating job recommendations using a Python backend and an Angular + Ionic frontend.

## Repository Layout

- `apps/backend` - Python backend dependencies and API service code.
- `apps/frontend` - Angular + Ionic client application.

## API Contract (Canonical DTO)

`POST /recommendations`

Request JSON:

```json
{
  "skills": ["Python", "FastAPI", "Angular"],
  "years_experience": 4,
  "preferred_locations": ["Remote", "New York"]
}
```

Response JSON:

```json
{
  "recommendations": [
    {
      "title": "Backend Engineer",
      "score": 0.92,
      "company": "Acme Corp",
      "location": "Remote",
      "reason": "Strong overlap with required backend skills.",
      "matched_skills": ["Python", "FastAPI"]
    }
  ]
}
```

Notes:
- `score` is a numeric match score from the backend (commonly 0-1; frontend renders it as a percentage).
- `company`, `location`, and `reason` are optional in each recommendation item.

## Current Status

- Frontend scaffold is present and ready to run.
- Backend currently contains dependency definitions (`requirements.txt`) and local virtual environment artifacts.
- You can use this README as the baseline setup contract while backend source modules are added.

## Prerequisites

- Python 3.11+
- Node.js 20+
- npm 10+

## Setup and Run

### 1) Backend setup

From `apps/backend`:

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

### 2) Backend run command

From `apps/backend`, run:

```powershell
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

The backend API will be available at `http://localhost:8000`.

### 3) Frontend setup

From `apps/frontend`:

```powershell
npm install
npm run start
```

By default, Angular dev server runs at `http://localhost:4200`.

### 4) Frontend/backend endpoint configuration

The frontend resolves the backend URL in this order:

1. Runtime config file: `apps/frontend/src/assets/config/app-config.json` (`apiBaseUrl`)
2. Angular environment fallback (`environment.ts` or `environment.prod.ts`)

#### Local development (recommended)

Use the committed local config:

- `apps/frontend/src/environments/environment.ts` points to `http://localhost:8000`
- `apps/frontend/src/assets/config/app-config.json` also points to `http://localhost:8000`

Start backend on port `8000` and frontend on port `4200`; no additional frontend edits are required.

#### Production deployment options

Choose one strategy:

- **Runtime configuration (preferred):** generate or replace `/assets/config/app-config.json` at deploy time with your real API URL.
- **Build-time replacement:** set `apiBaseUrl` in `apps/frontend/src/environments/environment.prod.ts` before running the production build.

If runtime config is missing, the frontend falls back to the value in `environment.prod.ts`.

## Useful Commands

From `apps/frontend`:

```powershell
npm run build
npm run lint
npm run test
```

From `apps/backend` (once tests are added):

```powershell
pytest
```

## Suggested Environment Variables

Create environment files instead of hardcoding secrets:

- Backend: `apps/backend/.env`
- Frontend: `apps/frontend/src/environments/environment.ts`

Do not commit real secrets. The root `.gitignore` already excludes `.env` files.

## Delivery Tracking

See `TASK.md` for implementation milestones and completion checklist.
