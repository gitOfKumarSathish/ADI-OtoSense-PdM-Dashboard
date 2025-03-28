import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import {
  includeBearerTokenInterceptor,
  provideKeycloak,
  withAutoRefreshToken,
  INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG,
  createInterceptorCondition,
  IncludeBearerTokenCondition,
  AutoRefreshTokenService,
  UserActivityService
} from 'keycloak-angular';
import { routes } from './app.routes';
import { environment } from '../environments/environment';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

const urlCondition = createInterceptorCondition<IncludeBearerTokenCondition>({
  urlPattern: /^(http:\/\/localhost:4001)(\/.*)?$/i,
  bearerPrefix: 'Bearer'
});

export const provideKeycloakAngular = () =>
  provideKeycloak({
    config: {
      url: environment.iamServiceEndPoint,
      realm: environment.realmName,
      clientId: environment.clientId
    },
    initOptions: {
      onLoad: 'login-required',
      checkLoginIframe: true,
      responseMode: 'fragment',
      flow: 'standard'
    },
    features: [
      withAutoRefreshToken({
        onInactivityTimeout: 'logout',
        sessionTimeout: 60000
      })
    ],
    providers: [AutoRefreshTokenService, UserActivityService]
  });


export const appConfig: ApplicationConfig = {
  providers: [provideKeycloakAngular(), provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes)]
};

