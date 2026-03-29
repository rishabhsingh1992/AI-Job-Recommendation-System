import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

export interface RecommendationRequest {
  skills: string[];
  experience: string;
  preferences: string;
}

export interface RecommendationResult {
  id?: string;
  title: string;
  company?: string;
  location?: string;
  score?: number;
  reason?: string;
  matchedSkills?: string[];
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
