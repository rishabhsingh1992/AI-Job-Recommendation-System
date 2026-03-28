from app.schemas.recommendations import JobRecommendation, RecommendationRequest, RecommendationResponse


_BASE_ROLES: list[tuple[str, set[str]]] = [
    ("Machine Learning Engineer", {"python", "tensorflow", "pytorch", "ml"}),
    ("Backend Python Engineer", {"python", "fastapi", "django", "sql"}),
    ("Data Analyst", {"sql", "excel", "tableau", "python"}),
]


def score_recommendations(payload: RecommendationRequest) -> RecommendationResponse:
    normalized_skills = {skill.lower() for skill in payload.skills}
    experience_bonus = min(payload.years_experience * 0.02, 0.2)

    scored = []
    for title, role_skills in _BASE_ROLES:
        overlap = len(normalized_skills & role_skills)
        skill_score = overlap / len(role_skills)
        total_score = min(skill_score + experience_bonus, 1.0)
        scored.append(JobRecommendation(title=title, score=round(total_score, 3)))

    scored.sort(key=lambda rec: rec.score, reverse=True)
    return RecommendationResponse(recommendations=scored)
