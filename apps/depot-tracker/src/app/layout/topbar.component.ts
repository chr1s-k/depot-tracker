import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ASSET_ROUTE_PATHS } from '../asset/asset.routes.constants';

@Component({
  selector: 'cs-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopbarComponent implements OnInit {
  constructor(private router: Router) {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  ngOnInit(): void {}

  navigateToAssetOverview() {
    this.router.navigate([ASSET_ROUTE_PATHS.assetOverview]);
  }
}
