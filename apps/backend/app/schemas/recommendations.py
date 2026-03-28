from pydantic import BaseModel, Field


class RecommendationRequest(BaseModel):
    skills: list[str] = Field(default_factory=list)
    preferred_locations: list[str] = Field(default_factory=list)
    years_experience: int = Field(ge=0)


class JobRecommendation(BaseModel):
    title: str
    score: float


class RecommendationResponse(BaseModel):
    recommendations: list[JobRecommendation]
