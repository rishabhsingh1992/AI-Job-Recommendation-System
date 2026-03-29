import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { RuntimeConfigService } from './runtime-config.service';

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
  private readonly http = inject(HttpClient);
  private readonly runtimeConfigService = inject(RuntimeConfigService);

  getRecommendations(payload: RecommendationRequest): Observable<RecommendationResponse> {
    const endpoint = `${this.runtimeConfigService.apiBaseUrl}/recommendations`;
    return this.http.post<RecommendationResponse>(endpoint, payload);
  }
}
