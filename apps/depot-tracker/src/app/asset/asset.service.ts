import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateAssetDto } from '@chris-k-software/api-interfaces';
import { URLS } from '@chris-k-software/api-interfaces';
import { AssetEntity } from '../../../../api/src/asset/asset.entity';

@Injectable({
  providedIn: 'root',
})
export class AssetService {
  constructor(private http: HttpClient) {}

  readonly prefix = 'api/';

  create(createAssetDto: CreateAssetDto): Observable<AssetEntity> {
    const url = this.prefix + URLS.assetCreateV1;
    return this.http.post<AssetEntity>(url, createAssetDto);
  }

  getAll(): Observable<AssetEntity[]> {
    const url = this.prefix + URLS.assetGetAllV1;
    return this.http.get<AssetEntity[]>(url);
  }
}
