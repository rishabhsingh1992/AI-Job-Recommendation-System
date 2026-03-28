# AI Job Recommendation System

A full-stack application for generating job recommendations using a Python backend and an Angular + Ionic frontend.

## Repository Layout

- `apps/backend` - Python backend dependencies and API service code.
- `apps/frontend` - Angular + Ionic client application.

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

### 3) Frontend setup

From `apps/frontend`:

```powershell
npm install
npm run start
```

By default, Angular dev server runs at `http://localhost:4200`.

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
