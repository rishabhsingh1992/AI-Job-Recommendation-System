from fastapi import FastAPI

from app.api.routers import health, recommendations

app = FastAPI(title="AI Job Recommendation API", version="0.1.0")

app.include_router(health.router)
app.include_router(recommendations.router)
