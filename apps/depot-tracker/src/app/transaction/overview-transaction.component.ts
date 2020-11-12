import { Component, OnInit, ViewChild } from '@angular/core';
import { ITransaction } from '@chris-k-software/api-interfaces';
import { Router } from '@angular/router';
import { TransactionService } from './transaction.service';
import { TransactionEntity } from '../../../../api/src/transaction/transaction.entity';
import { MatSort } from '@angular/material/sort';
import { Subscription } from 'rxjs';

interface OverviewTransactionColumn {
  displayName: string;
  visible: boolean;
  order: number;
}

@Component({
  selector: 'cs-overview-transaction',
  templateUrl: './overview-transaction.component.html',
  styleUrls: ['./overview-transaction.component.scss'],
})
export class OverviewTransactionComponent implements OnInit {
  constructor(
    private transactionService: TransactionService,
    private router: Router
  ) {}

  @ViewChild(MatSort) sort: MatSort;
  data: TransactionEntity[];

  readonly columns: Record<
    keyof ITransaction | 'id',
    OverviewTransactionColumn
  > = {
    id: {
      displayName: 'Id',
      visible: true,
      order: 0,
    },
    fee: { displayName: 'Fee', visible: true, order: 1 },
    unitCount: { displayName: 'Unit count', visible: true, order: 2 },
    unitPrice: { displayName: 'Unit price', visible: true, order: 3 },
  };

  subscriptions: Subscription[] = [];

  ngOnInit(): void {}

  displayedColumns(): string[] {
    const displayedDataColumns = Object.entries(this.columns)
      .filter((columnEntry) => columnEntry[1].visible)
      .sort((a, b) => a[1].order - b[1].order)
      .map((columnEntry) => columnEntry[0]);
    return displayedDataColumns.concat(['actions']);
  }
}
