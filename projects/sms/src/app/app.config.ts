import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import {
    provideKeycloak,
    withAutoRefreshToken,
    AutoRefreshTokenService,
    UserActivityService,
    createInterceptorCondition,
    IncludeBearerTokenCondition,
    INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG
} from 'keycloak-angular';
import { routes } from './app.routes';
import { environment } from '../environments/environment';

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
            checkLoginIframe: false,
            responseMode: 'fragment',
            flow: 'standard'
        },
        features: [
            withAutoRefreshToken({
                onInactivityTimeout: 'none',
                sessionTimeout: 60000
            })
        ],
        providers: [AutoRefreshTokenService, UserActivityService]
    });

export const appConfig: ApplicationConfig = {
    providers: [provideKeycloakAngular(),
    {
        provide: INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG,
        useValue: [urlCondition] // <-- Note that multiple conditions might be added.
    }, provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes)]
};

