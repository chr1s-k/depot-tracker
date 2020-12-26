import { Routes } from '@angular/router';
import { HandleAssetComponent } from './handle-asset.component';
import { OverviewAssetComponent } from './overview-asset.component';
import { ASSET_ROUTE_PATHS } from './asset.routes.constants';
import { TRANSACTION_ROUTE_PATHS } from '../transaction/transaction.routes.constants';
import { OverviewTransactionComponent } from '../transaction/overview-transaction.component';
import { CreateTransactionComponent } from '../transaction/create-transaction.component';
import { AssetResolver } from './asset.resolver';
import { AuthGuardWithForcedLogin } from '../shared/auth/auth-guard-with-forced-login.service';

export const assetRoutes: Routes = [
  {
    path: ASSET_ROUTE_PATHS.assetCreate,
    component: HandleAssetComponent,
  },
  {
    path: ASSET_ROUTE_PATHS.assetEdit + '/:id',
    component: HandleAssetComponent,
    resolve: {
      asset: AssetResolver,
    },
  },
  {
    path:
      ASSET_ROUTE_PATHS.asset + '/:id/' + TRANSACTION_ROUTE_PATHS.transaction,
    component: OverviewTransactionComponent,
  },
  {
    path:
      ASSET_ROUTE_PATHS.asset +
      '/:id/' +
      TRANSACTION_ROUTE_PATHS.transactionCreate,
    component: CreateTransactionComponent,
  },
  {
    path: ASSET_ROUTE_PATHS.asset,
    component: OverviewAssetComponent,
    // canActivate: [AuthGuardWithForcedLogin],
    canActivate: [],
  },
  {
    path: '',
    redirectTo: ASSET_ROUTE_PATHS.asset,
    pathMatch: 'full',
  },
  { path: '**', redirectTo: ASSET_ROUTE_PATHS.asset, pathMatch: 'full' },
];
