import {
  provideKeycloak,
  createInterceptorCondition,
  IncludeBearerTokenCondition,
  INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG,
  withAutoRefreshToken,
  AutoRefreshTokenService,
  UserActivityService
} from 'keycloak-angular';
import { environment } from '../environments/environment';

const localhostCondition = createInterceptorCondition<IncludeBearerTokenCondition>({
  urlPattern: /^(http:\/\/localhost:8181)(\/.*)?$/i
});

export const provideKeycloakAngular = () =>
  provideKeycloak({
    config: {
      url: environment.iamServiceEndPoint,
      realm: environment.realmName,
      clientId: environment.clientId
    },
    initOptions: {
      // onLoad: 'check-sso',
      // silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
      // redirectUri: window.location.origin + '/',
      onLoad: 'login-required',
      responseMode: 'fragment',
      enableLogging: true,
      flow: 'standard',
    },
    features: [
      withAutoRefreshToken({
        onInactivityTimeout: 'logout',
        sessionTimeout: 60000
      })
    ],
    providers: [
      AutoRefreshTokenService,
      UserActivityService,
      {
        provide: INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG,
        useValue: [localhostCondition]
      }
    ]
  });