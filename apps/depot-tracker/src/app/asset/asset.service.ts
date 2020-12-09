import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  AssetDto,
  AssetId,
  CreateAssetDto,
} from '@chris-k-software/api-interfaces';
import { URLS } from '@chris-k-software/api-interfaces';
import { DeleteResult } from 'typeorm/query-builder/result/DeleteResult';
import { map } from 'rxjs/operators';
import { Quote } from '@angular/compiler';
import { Asset } from './asset.class';
import { clone } from 'ramda';

@Injectable({
  providedIn: 'root',
})
export class AssetService {
  constructor(private http: HttpClient) {}
  readonly prefix = 'api/';

  private assets: Asset[] = [];
  private assetsSubject = new BehaviorSubject<Asset[]>([]);
  assets$ = this.assetsSubject.asObservable();

  private publishAssets() {
    this.assetsSubject.next(clone(this.assets));
  }

  create(createAssetDto: CreateAssetDto): Observable<Asset> {
    const url = this.prefix + URLS.assetCreateV1;
    return this.http.post<AssetDto>(url, createAssetDto).pipe(
      map((assetDto) => {
        const newAsset = new Asset(assetDto);
        this.assets.push(newAsset);
        this.publishAssets();
        return clone(newAsset);
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

  getAll(): Observable<Asset[]> {
    const url = this.prefix + URLS.assetGetAllV1;
    return this.http.get<AssetDto[]>(url).pipe(
      map((assetDtos) => {
        this.assets = assetDtos.map((assetDto) => new Asset(assetDto));
        this.publishAssets();
        return clone(this.assets);
      })
    );
  }

  symbolTypeahead(q: string): Observable<Quote[]> {
    const url = this.prefix + URLS.assetSymbolTypeahedV1;
    const params = new HttpParams().set('q', q);
    return this.http.get<Quote[]>(url, { params });
  }
}
