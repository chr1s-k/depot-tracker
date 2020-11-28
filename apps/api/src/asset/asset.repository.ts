import { EntityRepository, Repository } from 'typeorm';
import { AssetEntity } from './asset.entity';
import { CreateAssetDto } from '@chris-k-software/api-interfaces';

@EntityRepository(AssetEntity)
export class AssetRepository extends Repository<AssetEntity> {
  async createAsset(createAssetDto: CreateAssetDto) {
    const {
      name,
      description,
      isin,
      wkn,
      location,
      risk,
      type,
      tickerSymbol,
    } = createAssetDto;
    const assetEntity = new AssetEntity();
    assetEntity.created = new Date();
    assetEntity.name = name;
    assetEntity.description = description;
    assetEntity.risk = risk;
    assetEntity.isin = isin;
    assetEntity.wkn = wkn;
    assetEntity.type = type;
    assetEntity.tickerSymbol = tickerSymbol;
    assetEntity.location = location;
    assetEntity.transactions = [];
    await assetEntity.save();
    return assetEntity;
  }
}
