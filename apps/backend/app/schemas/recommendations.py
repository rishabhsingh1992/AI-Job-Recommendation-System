from pydantic import BaseModel, Field


class RecommendationRequest(BaseModel):
    skills: list[str] = Field(default_factory=list)
    years_experience: int = Field(default=0, ge=0)
    preferred_locations: list[str] = Field(default_factory=list)


class JobRecommendation(BaseModel):
    title: str
    score: float
    company: str | None = None
    location: str | None = None
    reason: str | None = None
    matched_skills: list[str] = Field(default_factory=list)


class RecommendationResponse(BaseModel):
    recommendations: list[JobRecommendation] = Field(default_factory=list)
