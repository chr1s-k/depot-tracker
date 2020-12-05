import {
  AssetDto,
  AssetId,
  AssetType,
  Description,
  Isin,
  Location,
  Name,
  Risk,
  TickerSymbol,
  TransactionDto,
  Wkn,
} from '@chris-k-software/api-interfaces';
import { isNull, isUndefined } from 'util';

export class Asset implements AssetDto {
  description: Description = undefined;
  id: AssetId = undefined;
  isin: Isin = undefined;
  location: Location = undefined;
  name: Name = undefined;
  risk: Risk = undefined;
  wkn: Wkn = undefined;
  type: AssetType = undefined;
  tickerSymbol: TickerSymbol = undefined;
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
    this.tickerSymbol = assetDto.tickerSymbol;

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
    // TODO decide on error handling
    if (isUndefined(asset) || isNull(asset))
      throw new Error('asset must be defined');
    if (isUndefined(asset.transactions) || isNull(asset.transactions))
      throw new Error('asset.transactions must be defined');
    const transactions = asset.transactions;
    return transactions.reduce(
      (value, transaction) =>
        value + transaction.unitCount * transaction.unitPrice,
      0
    );
  }
}
