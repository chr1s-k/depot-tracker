import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateTransactionComponent } from './create-transaction.component';
import { OverviewTransactionComponent } from './overview-transaction.component';

@NgModule({
  declarations: [CreateTransactionComponent, OverviewTransactionComponent],
  imports: [CommonModule],
})
export class TransactionModule {}
