import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { authConfigFactory } from './auth-config-factory';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private oauthService: OAuthService) {
    this.oauthService.configure(authConfigFactory());
  }

  init(): void {
    this.oauthService
      .loadDiscoveryDocument()
      .then(() => this.oauthService.initCodeFlow());
  }

  login(): void {
    this.oauthService.initCodeFlow();
  }

  logout(): void {
    this.oauthService.logOut();
  }

  logoutAndRevokeToken(): Promise<any> {
    return this.oauthService.revokeTokenAndLogout();
  }
}
