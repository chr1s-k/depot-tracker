import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { AssetService } from './asset.service';
import { AssetEntity } from '../../../../api/src/asset/asset.entity';
import { ASSET_ROUTE_PATHS } from './asset.routes.constants';
import { IAsset } from '@chris-k-software/api-interfaces';

interface OverviewColumn {
  displayName: string;
  visible: boolean;
  order: number;
}

@Component({
  selector: 'cs-overview-asset',
  templateUrl: './overview-asset.component.html',
  styleUrls: ['./overview-asset.component.scss'],
})
export class OverviewAssetComponent implements OnInit {
  constructor(private assetService: AssetService, private router: Router) {}

  columns: Record<keyof IAsset | 'id', OverviewColumn> = {
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

  displayedColumns(): string[] {
    return Object.entries(this.columns)
      .filter((columnEntry) => columnEntry[1].visible)
      .sort((a, b) => a[1].order - b[1].order)
      .map((columnEntry) => columnEntry[0]);
  }

  @ViewChild(MatSort) sort: MatSort;
  data: AssetEntity[];

  ngOnInit(): void {
    this.assetService.getAll().subscribe((data) => {
      console.log('data', data);
      this.data = data;
    });
  }

  navigateToAssetCreate() {
    this.router.navigate([ASSET_ROUTE_PATHS.assetCreate]);
  }
}
