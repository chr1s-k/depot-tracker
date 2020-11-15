import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  AssetDto,
  AssetId,
  CreateAssetDto,
  Description,
  Isin,
  Risk,
  TransactionDto,
  Location,
  Name,
  Wkn,
  AssetType,
} from '@chris-k-software/api-interfaces';
import { URLS } from '@chris-k-software/api-interfaces';
import { DeleteResult } from 'typeorm/query-builder/result/DeleteResult';
import { map } from 'rxjs/operators';
import clone from 'ramda/src/clone';
import { isUndefined } from 'util';

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
}

export class Asset implements AssetDto {
  description: Description = undefined;
  id: AssetId = undefined;
  isin: Isin = undefined;
  location: Location = undefined;
  name: Name = undefined;
  risk: Risk = undefined;
  wkn: Wkn = undefined;
  type: AssetType = undefined;
  created: Date = new Date();
  transactions: TransactionDto[] = [];

  fees = 0;
  value = 0;
  unitCount = 0;

  constructor(assetDto: AssetDto) {
    this.id = assetDto.id;
    this.description = assetDto.description;
    this.isin = assetDto.isin;
    this.location = assetDto.location;
    this.name = assetDto.name;
    this.risk = assetDto.risk;
    this.wkn = assetDto.wkn;
    this.type = assetDto.type;
    this.created = assetDto.created;
    this.transactions = assetDto.transactions;
    this.fees = Asset.calcFees(this);
    this.value = Asset.calcValue(this);
    this.unitCount = Asset.calcUnitCount(this);
  }

  static calcFees(asset: Asset): number {
    if (isUndefined(asset)) return -1;
    const transactions = asset.transactions;
    return transactions
      .map((transaction) => transaction.fee)
      .reduce((fee, sumFee) => {
        return fee + sumFee;
      }, 0);
  }

  static calcUnitCount(asset: Asset): number {
    if (isUndefined(asset)) return -1;
    const transactions = asset.transactions;
    return transactions
      .map((transaction) => transaction.unitCount)
      .reduce((sumFee, fee) => sumFee + fee, 0);
  }

  static calcValue(asset: Asset): number {
    if (isUndefined(asset)) return -1;
    const transactions = asset.transactions;
    return transactions.reduce(
      (value, transaction) =>
        value + transaction.unitCount * transaction.unitPrice,
      0
    );
  }
}
