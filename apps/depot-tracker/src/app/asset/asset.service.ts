import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  AssetDto,
  AssetId,
  CreateAssetDto,
  URLS,
} from '@chris-k-software/api-interfaces';
import { DeleteResult } from 'typeorm/query-builder/result/DeleteResult';
import { map } from 'rxjs/operators';
import { Asset } from './asset.class';

@Injectable({
  providedIn: 'root',
})
export class AssetService {
  readonly prefix = 'api/';

  constructor(private http: HttpClient) {}

  create$(createAssetDto: CreateAssetDto): Observable<Asset> {
    const url = this.prefix + URLS.assetCreateV1;
    return this.http.post<AssetDto>(url, createAssetDto).pipe(
      map((assetDto) => {
        return new Asset(assetDto);
      })
    );
  }

  delete$(id: AssetId): Observable<DeleteResult> {
    const url = this.prefix + URLS.assetDeleteV1;
    const params = new HttpParams().set('id', id.toString());
    return this.http.delete<DeleteResult>(url, { params });
  }

  getById$(id: AssetId): Observable<Asset> {
    const url = this.prefix + URLS.assetGetV1 + '/' + id;
    return this.http
      .get<AssetDto>(url)
      .pipe(map((assetDto) => new Asset(assetDto)));
  }

  all$(): Observable<Asset[]> {
    const url = this.prefix + URLS.assetGetV1;
    return this.http
      .get<AssetDto[]>(url)
      .pipe(
        map((assetDtos) => assetDtos.map((assetDto) => new Asset(assetDto)))
      );
  }
}
