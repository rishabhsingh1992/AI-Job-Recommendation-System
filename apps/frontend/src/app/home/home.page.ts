import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  IonBadge,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonChip,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
  IonSpinner,
  IonText,
  IonTextarea,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';

import {
  RecommendationApiService,
  RecommendationResult,
} from '../services/recommendation-api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonBadge,
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonChip,
    IonContent,
    IonHeader,
    IonInput,
    IonItem,
    IonLabel,
    IonList,
    IonNote,
    IonSpinner,
    IonText,
    IonTextarea,
    IonTitle,
    IonToolbar,
  ],
})
export class HomePage {
  recommendationForm = this.formBuilder.group({
    skills: ['', [Validators.required]],
    yearsExperience: ['', [Validators.required]],
    preferredLocations: [''],
  });

  recommendations: RecommendationResult[] = [];
  loading = false;
  errorMessage = '';

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly recommendationApi: RecommendationApiService,
  ) {}

  get hasResults(): boolean {
    return this.recommendations.length > 0;
  }

  formatScore(score: number): string {
    const percentage = score <= 1 ? score * 100 : score;
    return `${percentage.toFixed(1)}%`;
  }

  submit(): void {
    if (this.recommendationForm.invalid || this.loading) {
      this.recommendationForm.markAllAsTouched();
      return;
    }

    const { skills, yearsExperience, preferredLocations } = this.recommendationForm.getRawValue();

    const skillList = (skills ?? '')
      .split(',')
      .map((skill) => skill.trim())
      .filter(Boolean);

    const locationList = (preferredLocations ?? '')
      .split(',')
      .map((location) => location.trim())
      .filter(Boolean);

    const parsedYearsExperience = Number.parseInt((yearsExperience ?? '').toString(), 10);

    this.loading = true;
    this.errorMessage = '';
    this.recommendations = [];

    this.recommendationApi
      .getRecommendations({
        skills: skillList,
        years_experience: Number.isNaN(parsedYearsExperience) ? 0 : Math.max(parsedYearsExperience, 0),
        preferred_locations: locationList,
      })
      .subscribe({
        next: (response) => {
          this.recommendations = response.recommendations ?? [];
          this.loading = false;
        },
        error: () => {
          this.errorMessage = 'Unable to fetch recommendations. Please try again.';
          this.loading = false;
        },
      });
  }
}
