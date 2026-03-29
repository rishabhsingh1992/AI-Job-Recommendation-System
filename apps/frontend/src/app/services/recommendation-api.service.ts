import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

export interface RecommendationRequest {
  skills: string[];
  years_experience: number;
  preferred_locations: string[];
}

export interface RecommendationResult {
  title: string;
  score: number;
  company?: string | null;
  location?: string | null;
  reason?: string | null;
  matched_skills: string[];
}

export interface RecommendationResponse {
  recommendations: RecommendationResult[];
}

@Injectable({
  providedIn: 'root',
})
export class RecommendationApiService {
  private readonly endpoint = `${environment.apiBaseUrl}/recommendations`;

  constructor(private readonly http: HttpClient) {}

  getRecommendations(payload: RecommendationRequest): Observable<RecommendationResponse> {
    return this.http.post<RecommendationResponse>(this.endpoint, payload);
  }
}
