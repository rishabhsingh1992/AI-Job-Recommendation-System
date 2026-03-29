from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


def test_recommendation_scores_are_normalized_float_contract() -> None:
    response = client.post(
        "/recommendations",
        json={
            "skills": ["python", "sql"],
            "years_experience": 2,
            "preferred_locations": ["Remote"],
        },
    )

    assert response.status_code == 200

    body = response.json()
    assert body == {
        "recommendations": [
            {
                "title": "Backend Python Engineer",
                "score": 0.54,
                "company": None,
                "location": None,
                "reason": None,
                "matched_skills": [],
            },
            {
                "title": "Data Analyst",
                "score": 0.54,
                "company": None,
                "location": None,
                "reason": None,
                "matched_skills": [],
            },
            {
                "title": "Machine Learning Engineer",
                "score": 0.29,
                "company": None,
                "location": None,
                "reason": None,
                "matched_skills": [],
            },
        ]
    }
