import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { MatSort, Sort } from '@angular/material/sort';
import { Asset, AssetService } from './asset.service';
import { ASSET_ROUTE_PATHS } from './asset.routes.constants';
import { TRANSACTION_ROUTE_PATHS } from '../transaction/transaction.routes.constants';
import { Subscription } from 'rxjs';
import { CurrencyPipe } from '@angular/common';
import { ColumnTypes } from '../shared/column-types';

interface OverviewColumn {
  header: string;
  isVisible: boolean;
  order: number;
  type: ColumnTypes;
}

@Component({
  selector: 'cs-overview-asset',
  templateUrl: './overview-asset.component.html',
  styleUrls: ['./overview-asset.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverviewAssetComponent
  implements OnInit, AfterViewInit, OnDestroy {
  constructor(
    private assetService: AssetService,
    private router: Router,
    private currencyPipe: CurrencyPipe,
    private ref: ChangeDetectorRef
  ) {}

  @ViewChild(MatSort) sort: MatSort;
  data: Asset[] = [];

  subscriptions: Subscription[] = [];

  readonly columnTypes = ColumnTypes;

  readonly columns: Record<
    Exclude<keyof Asset, 'transactions'>,
    OverviewColumn
  > = {
    description: {
      header: 'Description',
      isVisible: true,
      order: 2,
      type: this.columnTypes.text,
    },
    id: {
      header: 'Id',
      isVisible: false,
      order: 0,
      type: this.columnTypes.text,
    },
    isin: {
      header: 'Isin',
      isVisible: false,
      order: 6,
      type: this.columnTypes.text,
    },
    location: {
      header: 'Location',
      isVisible: false,
      order: 3,
      type: this.columnTypes.text,
    },
    name: {
      header: 'Name',
      isVisible: true,
      order: 1,
      type: this.columnTypes.text,
    },
    risk: {
      header: 'Risk',
      isVisible: true,
      order: 4,
      type: this.columnTypes.text,
    },
    type: {
      header: 'Asset type',
      isVisible: true,
      order: 5,
      type: this.columnTypes.text,
    },
    wkn: {
      header: 'Wkn',
      isVisible: false,
      order: 7,
      type: this.columnTypes.text,
    },
    tickerSymbol: {
      header: 'Ticker',
      isVisible: true,
      order: 8,
      type: this.columnTypes.text,
    },
    value: {
      header: 'Value',
      isVisible: true,
      order: 9,
      type: this.columnTypes.currency,
    },
    fees: {
      header: 'Fees',
      isVisible: true,
      order: 11,
      type: this.columnTypes.currency,
    },
    unitCount: {
      header: 'Unit count',
      isVisible: false,
      order: 10,
      type: this.columnTypes.text,
    },
    created: {
      header: 'Created',
      isVisible: false,
      order: 12,
      type: this.columnTypes.date,
    },
  };

  displayedColumns(): string[] {
    const displayedDataColumns = Object.entries(this.columns)
      .filter((column) => column[1].isVisible)
      .sort((a, b) => a[1].order - b[1].order)
      .map((columnEntry) => columnEntry[0]);
    return displayedDataColumns.concat(['actions']);
  }

  totalValueFor(key: keyof Asset & ('fees' | 'value' | 'unitCount')) {
    if (key === 'value' || key === 'fees') {
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

  ngOnInit(): void {
    this.subscriptions.push(
      this.assetService.assets$.subscribe((data) => {
        this.data = data;
        this.ref.markForCheck();
      })
    );
    this.assetService.getAll().subscribe();
  }

  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe((sort: Sort) => this.sortData(sort));
  }

  navigateToAssetCreate() {
    this.router.navigate([ASSET_ROUTE_PATHS.assetCreate]);
  }

  keepKeyOrder() {
    return 0;
  }

  private sortData(sort: Sort): void {
    let sortFct: (a, b) => -1 | 1 | 0;
    if (sort.direction === 'asc') {
      sortFct = (a, b) => {
        if (a[sort.active] === b[sort.active]) return 0;
        return a[sort.active] > b[sort.active] ? 1 : -1;
      };
    } else if (sort.direction === 'desc') {
      sortFct = (a, b) => {
        if (a[sort.active] === b[sort.active]) return 0;
        return a[sort.active] > b[sort.active] ? -1 : 1;
      };
    } else {
      sortFct = () => 0;
    }
    this.data.sort(sortFct);
    this.data = [...this.data];
  }

  goToAssetTransaction(asset: Asset) {
    this.router.navigateByUrl(
      ASSET_ROUTE_PATHS.asset +
        '/' +
        asset.id +
        '/' +
        TRANSACTION_ROUTE_PATHS.transaction
    );
  }

  removeAsset(asset: Asset) {
    this.assetService.delete(asset.id).subscribe();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  addTransaction(asset: Asset) {
    this.router.navigateByUrl(
      ASSET_ROUTE_PATHS.asset +
        '/' +
        asset.id +
        '/' +
        TRANSACTION_ROUTE_PATHS.transactionCreate
    );
  }

  diagramOptionsTypes(): unknown {
    const legendData = this.data.map((asset) => asset.type);
    let data = this.data.reduce((acc, val) => {
      acc[val.type] = (acc[val.type] || 0) + val.value;
      return acc;
    }, {});

    data = Object.entries(data).map((entry) => ({
      name: entry[0],
      value: entry[1],
    }));

    return {
      title: {
        text: 'Type allocation',
        x: 'center',
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)',
      },
      legend: {
        x: 'center',
        y: 'bottom',
        data: legendData,
      },
      calculable: true,
      series: [
        {
          name: 'area',
          type: 'pie',
          radius: [30, 110],
          // roseType: 'area',
          data: data,
        },
      ],
    };
  }

  diagramOptions(): unknown {
    const legendData = this.data.map((asset) => asset.name);
    const data = this.data.map((asset) => ({
      value: asset.value,
      name: asset.name,
    }));
    return {
      title: {
        text: 'Asset allocation',
        x: 'center',
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)',
      },
      legend: {
        x: 'center',
        y: 'bottom',
        data: legendData,
      },
      calculable: true,
      series: [
        {
          name: 'area',
          type: 'pie',
          radius: [30, 110],
          // roseType: 'area',
          data: data,
        },
      ],
    };
  }
}
