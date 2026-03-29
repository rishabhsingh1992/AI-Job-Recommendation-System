import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';

interface RuntimeConfig {
  apiBaseUrl?: string;
}

@Injectable({
  providedIn: 'root',
})
export class RuntimeConfigService {
  private config: RuntimeConfig = {};

  async load(): Promise<void> {
    try {
      const response = await fetch('/assets/config/app-config.json', { cache: 'no-store' });

      if (!response.ok) {
        return;
      }

      const runtimeConfig = (await response.json()) as RuntimeConfig;
      this.config = runtimeConfig;
    } catch {
      // Use environment fallback if runtime config is unavailable.
    }
  }

  get apiBaseUrl(): string {
    return this.config.apiBaseUrl ?? environment.apiBaseUrl;
  }
}
