import { Routes } from '@angular/router';
import { TRANSACTION_ROUTE_PATHS } from './transaction.routes.constants';
import { TransactionComponent } from './transaction.component';

export const transactionRoutes: Routes = [
  {
    path: TRANSACTION_ROUTE_PATHS.transactionCreate,
    component: TransactionComponent,
  },
];
