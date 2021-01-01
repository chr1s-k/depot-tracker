import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardWithForcedLogin implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.authService.isDoneInitializing$.pipe(
      filter((isDone) => isDone),
      switchMap(() => this.authService.isAuthenticated$),
      tap((isAuthenticated) => {
        if (!isAuthenticated) this.authService.login();
      })
    );
  }
}