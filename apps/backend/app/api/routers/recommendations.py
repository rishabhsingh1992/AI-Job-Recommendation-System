from fastapi import APIRouter

from app.schemas.recommendations import RecommendationRequest, RecommendationResponse
from app.services.recommendation_service import score_recommendations

router = APIRouter(tags=["recommendations"])


@router.post("/recommendations", response_model=RecommendationResponse)
def recommend_jobs(payload: RecommendationRequest) -> RecommendationResponse:
    return score_recommendations(payload)
