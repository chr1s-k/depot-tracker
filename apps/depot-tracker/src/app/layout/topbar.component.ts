import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ASSET_ROUTE_PATHS } from '../asset/asset.routes.constants';
import { AuthService } from '../shared/auth/auth.service';
import { Observable } from 'rxjs';
import { UserInfo } from 'angular-oauth2-oidc';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'cs-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopbarComponent implements OnInit {
  userInfo$: Observable<UserInfo>;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.userInfo$ = this.authService.userInfo$.pipe(tap(console.log));
  }

  navigateToAssetOverview() {
    this.router.navigate([ASSET_ROUTE_PATHS.asset]);
  }

  logout() {
    this.authService.logoutAndRevokeToken();
  }
}
