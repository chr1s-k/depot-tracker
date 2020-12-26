import { Routes } from '@angular/router';
import { TRANSACTION_ROUTE_PATHS } from './transaction.routes.constants';
import { CreateTransactionComponent } from './create-transaction.component';

export const transactionRoutes: Routes = [
  {
    path: TRANSACTION_ROUTE_PATHS.transactionCreate,
    component: CreateTransactionComponent,
    loadChildren: () =>
      import('./transaction.module').then((m) => m.TransactionModule),
  },
];
