import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { includeBearerTokenInterceptor } from 'keycloak-angular';

import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { provideKeycloakAngular } from './keycloak.config';

export const appConfig: ApplicationConfig = {
    providers: [provideKeycloakAngular(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([includeBearerTokenInterceptor]))]
};

