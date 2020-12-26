import { Injectable } from '@angular/core';
import { OAuthService, UserInfo } from 'angular-oauth2-oidc';
import { authConfigFactory } from './auth-config-factory';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // TODO: Create state
  private isDoneInitializingSubject$ = new BehaviorSubject(false);
  isDoneInitializing$ = this.isDoneInitializingSubject$.asObservable();

  private isAuthenticatedSubject = new BehaviorSubject(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  private userInfoSubject$ = new BehaviorSubject<UserInfo>(undefined);
  userInfo$ = this.userInfoSubject$.asObservable();

  constructor(private oauthService: OAuthService) {
    this.oauthService.configure(authConfigFactory());
  }

  init(): void {
    this.oauthService
      .loadDiscoveryDocument()
      .then(() => this.oauthService.tryLoginCodeFlow())
      .then(() => {
        const hasValidAccessToken = this.oauthService.hasValidAccessToken();
        this.isAuthenticatedSubject.next(hasValidAccessToken);

        this.oauthService
          .loadUserProfile()
          .then((userInfo) => this.userInfoSubject$.next(userInfo));

        this.isDoneInitializingSubject$.next(true);
      })
      .catch(() => this.isDoneInitializingSubject$.next(true));
  }

  login(): void {
    this.oauthService.initCodeFlow();
  }

  logout(): void {
    this.oauthService.logOut();
  }

  logoutAndRevokeToken(): Promise<unknown> {
    return this.oauthService.revokeTokenAndLogout();
  }
}
