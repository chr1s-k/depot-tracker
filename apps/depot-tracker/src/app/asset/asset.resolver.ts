import { Injectable } from '@angular/core';
import { Asset } from './asset.class';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AssetService } from './asset.service';

@Injectable({
  providedIn: 'root',
})
export class AssetResolver implements Resolve<Asset> {
  constructor(public assetService: AssetService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Asset> | Promise<Asset> | Asset {
    const assetId = route.paramMap.get('id');
    return this.assetService.getById$(+assetId);
  }
}
