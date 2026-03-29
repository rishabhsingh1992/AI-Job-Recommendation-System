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
    experience: ['', [Validators.required]],
    preferences: [''],
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

  submit(): void {
    if (this.recommendationForm.invalid || this.loading) {
      this.recommendationForm.markAllAsTouched();
      return;
    }

    const { skills, experience, preferences } = this.recommendationForm.getRawValue();

    const skillList = (skills ?? '')
      .split(',')
      .map((skill) => skill.trim())
      .filter(Boolean);

    this.loading = true;
    this.errorMessage = '';
    this.recommendations = [];

    this.recommendationApi
      .getRecommendations({
        skills: skillList,
        experience: experience ?? '',
        preferences: preferences ?? '',
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
