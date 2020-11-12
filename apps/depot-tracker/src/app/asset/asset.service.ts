import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { AssetId, CreateAssetDto } from '@chris-k-software/api-interfaces';
import { URLS } from '@chris-k-software/api-interfaces';
import { AssetEntity } from '../../../../api/src/asset/asset.entity';
import { DeleteResult } from 'typeorm/query-builder/result/DeleteResult';
import { map } from 'rxjs/operators';
import clone from 'ramda/src/clone';

@Injectable({
  providedIn: 'root',
})
export class AssetService {
  constructor(private http: HttpClient) {}
  readonly prefix = 'api/';

  private assets: AssetEntity[] = [];
  private assetsSubject = new BehaviorSubject<AssetEntity[]>([]);
  assets$ = this.assetsSubject.asObservable();

  private publishAssets() {
    this.assetsSubject.next(clone(this.assets));
    console.log('this.assets', this.assets);
  }

  create(createAssetDto: CreateAssetDto): Observable<AssetEntity> {
    const url = this.prefix + URLS.assetCreateV1;
    return this.http.post<AssetEntity>(url, createAssetDto).pipe(
      map((newAsset) => {
        this.assets.push(newAsset);
        this.publishAssets();
        return newAsset;
      })
    );
  }

  delete(id: AssetId): Observable<DeleteResult> {
    const url = this.prefix + URLS.assetDeleteV1;
    const params = new HttpParams().set('id', id.toString());
    return this.http
      .delete<DeleteResult>(url, { params })
      .pipe(
        map((deleteResult) => {
          if (deleteResult.affected === 1) {
            this.assets = this.assets.filter((asset) => asset.id != id);
            this.publishAssets();
          }
          return deleteResult;
        })
      );
  }

  getAll(): Observable<AssetEntity[]> {
    const url = this.prefix + URLS.assetGetAllV1;
    return this.http.get<AssetEntity[]>(url).pipe(
      map((assets) => {
        this.assets = assets;
        this.publishAssets();
        return assets;
      })
    );
  }
}
