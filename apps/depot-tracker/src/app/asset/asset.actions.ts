import { CreateAssetDto } from '@chris-k-software/api-interfaces';
import { Asset } from './asset.class';

export class AssetCreate {
  static readonly type = '[ASSET USER] Create Asset';
  constructor(public createAssetDto: CreateAssetDto) {}
}

export class AssetDelete {
  static readonly type = '[ASSET USER] Delete Asset';
  constructor(public asset: Asset) {}
}

export class AssetGet {
  static readonly type = '[ASSET USER] Get Assets';
}
