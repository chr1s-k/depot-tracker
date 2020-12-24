import { AuthConfig } from 'angular-oauth2-oidc';

export const authConfigFactory = (): AuthConfig => {
  const clientId = 'depot-tracker';
  const url = 'http://localhost:8080';
  const realmName = 'chris-k-software';
  return {
    issuer: url + '/auth/realms/' + realmName,
    // URL of the SPA to redirect the user to after login
    redirectUri: window.location.origin + window.location.pathname,
    clientId: clientId,
    responseType: 'code',
    // silentRefreshRedirectUri: window.location.origin + '/silent-refresh.html',
    scope: 'openid profile offline_access', // Ask offline_access to support refresh token refreshes
    // showDebugInformation: true, // Also requires enabling "Verbose" level in devtools
    // useSilentRefresh: true, // Needed for Code Flow to suggest using iframe-based refreshes
    // silentRefreshTimeout: 5000, // For faster testing
    // timeoutFactor: 0.25, // For faster testing
    postLogoutRedirectUri: window.location.origin + '/welcome',
    sessionChecksEnabled: false,
    clearHashAfterLogin: false, // https://github.com/manfredsteyer/angular-oauth2-oidc/issues/457#issuecomment-431807040,
    dummyClientSecret: 'abc',
    // requireHttps: false,
  };
};
