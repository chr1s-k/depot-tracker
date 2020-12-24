import { ModuleWithProviders, NgModule } from '@angular/core';
import {
  OAuthModule,
  OAuthModuleConfig,
  OAuthStorage,
} from 'angular-oauth2-oidc';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuardWithForcedLogin } from './auth-guard-with-forced-login.service';
import { AuthService } from './auth.service';
import { authModuleConfig } from './auth-module-config';

// Need a factory since localStorage is not available at AOT build time
export function storageFactory(): OAuthStorage {
  return localStorage;
}

@NgModule({
  imports: [HttpClientModule, OAuthModule.forRoot()],
  providers: [AuthService, AuthGuardWithForcedLogin],
})
export class AuthModule {
  static forRoot(): ModuleWithProviders<AuthModule> {
    return {
      ngModule: AuthModule,
      providers: [
        { provide: OAuthModuleConfig, useValue: authModuleConfig },
        { provide: OAuthStorage, useFactory: storageFactory },
      ],
    };
  }
}
