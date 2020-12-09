import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSort, Sort } from '@angular/material/sort';
import { Subscription } from 'rxjs';
import { AssetService } from '../asset/asset.service';
import { Transaction } from './transaction.service';
import { CurrencyPipe, Location } from '@angular/common';
import { ColumnTypes } from '../shared/column-types';
import { Asset } from '../asset/asset.class';

interface OverviewTransactionColumn {
  displayName: string;
  isVisible: boolean;
  order: number;
  type: ColumnTypes;
}

@Component({
  selector: 'cs-overview-transaction',
  templateUrl: './overview-transaction.component.html',
  styleUrls: ['./overview-transaction.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverviewTransactionComponent
  implements OnInit, AfterViewInit, OnDestroy {
  constructor(
    private assetService: AssetService,
    private router: Router,
    private route: ActivatedRoute,
    private currencyPipe: CurrencyPipe,
    private location: Location
  ) {}

  @ViewChild(MatSort) sort!: MatSort;
  data: Transaction[] = [];

  readonly columnTypes = ColumnTypes;

  readonly columns: Record<keyof Transaction, OverviewTransactionColumn> = {
    id: {
      displayName: 'Id',
      isVisible: true,
      order: 0,
      type: this.columnTypes.text,
    },
    fee: {
      displayName: 'Fee',
      isVisible: true,
      order: 1,
      type: this.columnTypes.currency,
    },
    unitCount: {
      displayName: 'Unit count',
      isVisible: true,
      order: 2,
      type: this.columnTypes.text,
    },
    unitPrice: {
      displayName: 'Unit price',
      isVisible: true,
      order: 3,
      type: this.columnTypes.currency,
    },
    created: {
      displayName: 'Created',
      isVisible: true,
      order: 4,
      type: this.columnTypes.date,
    },
    note: {
      displayName: 'Note',
      isVisible: true,
      order: 5,
      type: this.columnTypes.text,
    },
  };

  subscriptions: Subscription[] = [];

  ngOnInit(): void {
    this.subscriptions.push(
      this.assetService.assets$.subscribe((assets) => {
        const assetId = this.route.snapshot.paramMap.get('id');
        if (assetId != null) {
          this.data = this.extractTableData(assets, +assetId);
        } else {
          throw new Error(
            'assetId was null, but expected to be a number string'
          );
        }
      })
    );
  }

  private extractTableData(assets: Asset[], assetId: number) {
    if (assets.length === 0) {
      return [];
    } else {
      return assets.filter((asset) => asset.id === assetId)[0].transactions;
    }
  }

  displayedColumns(): string[] {
    return Object.entries(this.columns)
      .filter((column) => column[1].isVisible)
      .sort((a, b) => a[1].order - b[1].order)
      .map((columnEntry) => columnEntry[0]);
  }

  totalValueFor(key: keyof Transaction & ('fee' | 'unitPrice' | 'unitCount')) {
    if (key === 'fee' || key === 'unitPrice') {
      const res = this.data
        .map((asset) => asset[key])
        .reduce((acc, val) => acc + val, 0)
        .toString();
      return this.currencyPipe.transform(res);
    } else if (key === 'unitCount') {
      return this.data
        .map((asset) => asset[key])
        .reduce((acc, val) => acc + val, 0)
        .toString();
    } else {
      return '';
    }
  }

  private sortFctFactory(sort: Sort): (a: any, b: any) => -1 | 1 | 0 {
    if (sort.direction === 'asc') {
      return (a, b) => {
        if (a[sort.active] === b[sort.active]) return 0;
        return a[sort.active] > b[sort.active] ? 1 : -1;
      };
    } else if (sort.direction === 'desc') {
      return (a, b) => {
        if (a[sort.active] === b[sort.active]) return 0;
        return a[sort.active] > b[sort.active] ? -1 : 1;
      };
    } else {
      return () => 0;
    }
  }

  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe((sort: Sort) => {
      this.data.sort(this.sortFctFactory(sort));
      this.data = [...this.data];
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  onCancel() {
    this.location.back();
  }
}
