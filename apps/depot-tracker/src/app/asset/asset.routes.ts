import { Routes } from '@angular/router';
import { CreateAssetComponent } from './create-asset.component';
import { OverviewAssetComponent } from './overview-asset.component';
import { ASSET_ROUTE_PATHS } from './asset.routes.constants';

export const assetRoutes: Routes = [
  {
    path: ASSET_ROUTE_PATHS.assetCreate,
    component: CreateAssetComponent,
  },
  {
    path: ASSET_ROUTE_PATHS.assetOverview,
    component: OverviewAssetComponent,
  },
];
