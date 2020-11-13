import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ITransaction } from '@chris-k-software/api-interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSort, Sort } from '@angular/material/sort';
import { Subscription } from 'rxjs';
import { AssetService } from '../asset/asset.service';
import { Transaction } from './transaction.service';

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
export class OverviewTransactionComponent
  implements OnInit, AfterViewInit, OnDestroy {
  constructor(
    private assetService: AssetService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  @ViewChild(MatSort) sort: MatSort;
  data: Transaction[];

  readonly columns: Record<
    keyof ITransaction | 'id' | 'created',
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
    created: { displayName: 'Created', visible: true, order: 4 },
  };

  subscriptions: Subscription[] = [];

  ngOnInit(): void {
    this.subscriptions.push(
      this.assetService.assets$.subscribe((assets) => {
        const assetId = +this.route.snapshot.paramMap.get('id');
        this.data = assets.filter(
          (asset) => asset.id === assetId
        )[0].transactions;
      })
    );
  }

  displayedColumns(): string[] {
    return Object.entries(this.columns)
      .filter((column) => column[1].visible)
      .sort((a, b) => a[1].order - b[1].order)
      .map((columnEntry) => columnEntry[0]);
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

  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe((sort: Sort) => this.sortData(sort));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
