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
import { AssetService } from './asset.service';
import { ASSET_ROUTE_PATHS } from './asset.routes.constants';
import { IAsset } from '@chris-k-software/api-interfaces';
import { TRANSACTION_ROUTE_PATHS } from '../transaction/transaction.routes.constants';
import { AssetEntity } from '../../../../api/src/asset/asset.entity';
import { Subscription } from 'rxjs';

interface OverviewColumn {
  displayName: string;
  visible: boolean;
  order: number;
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
    private ref: ChangeDetectorRef
  ) {}

  @ViewChild(MatSort) sort: MatSort;
  data: AssetEntity[] = [];

  readonly columns: Record<keyof IAsset | 'id', OverviewColumn> = {
    description: {
      displayName: 'Description',
      visible: true,
      order: 2,
    },
    id: {
      displayName: 'Id',
      visible: true,
      order: 0,
    },
    isin: { displayName: 'Isin', visible: true, order: 5 },
    location: { displayName: 'Location', visible: true, order: 3 },
    name: { displayName: 'Name', visible: true, order: 1 },
    risk: { displayName: 'Risk', visible: true, order: 4 },
    wkn: { displayName: 'Wkn', visible: true, order: 6 },
  };

  subscriptions: Subscription[] = [];

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

  displayedColumns(): string[] {
    const displayedDataColumns = Object.entries(this.columns)
      .filter((columnEntry) => columnEntry[1].visible)
      .sort((a, b) => a[1].order - b[1].order)
      .map((columnEntry) => columnEntry[0]);
    return displayedDataColumns.concat(['actions']);
  }

  navigateToAssetCreate() {
    this.router.navigate([ASSET_ROUTE_PATHS.assetCreate]);
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

  goToAssetTransaction(asset: AssetEntity) {
    this.router.navigateByUrl(
      ASSET_ROUTE_PATHS.asset +
        '/' +
        asset.id +
        '/' +
        TRANSACTION_ROUTE_PATHS.transaction
    );
  }

  removeAsset(asset: AssetEntity) {
    this.assetService.delete(asset.id).subscribe();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  addTransaction(asset: AssetEntity) {
    this.router.navigateByUrl(
      ASSET_ROUTE_PATHS.asset +
        '/' +
        asset.id +
        '/' +
        TRANSACTION_ROUTE_PATHS.transactionCreate
    );
  }
}
