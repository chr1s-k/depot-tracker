import { Routes } from '@angular/router';
import { CreateAssetComponent } from './create-asset.component';
import { OverviewAssetComponent } from './overview-asset.component';
import { ASSET_ROUTE_PATHS } from './asset.routes.constants';
import { CreateTransactionComponent } from '../transaction/create-transaction.component';
import { TRANSACTION_ROUTE_PATHS } from '../transaction/transaction.routes.constants';

export const assetRoutes: Routes = [
  {
    path: ASSET_ROUTE_PATHS.assetCreate,
    component: CreateAssetComponent,
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
  },
];
