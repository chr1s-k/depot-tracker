import { IsIn, IsOptional, IsString, MinLength } from 'class-validator';
import { TransactionDto } from './api-transaction-interface';

export interface IAsset {
  name: Name;
  description: Description;
  risk: Risk;
  location: Location;
  isin: Isin;
  wkn: Wkn;
  tickerSymbol: TickerSymbol;
  type: AssetType;
}

export interface AssetDto extends IAsset {
  id: AssetId;
  created: Date;
  transactions: TransactionDto[];
}

export type AssetId = number;
export type Name = string;
export type Description = string;
export type Location = string;
export type Isin = string;
export type Wkn = string;
export type TickerSymbol = string;
export type Risk = 'high' | 'middle' | 'low';
const IsInRisk: Risk[] = ['low', 'middle', 'high'];
export type AssetType = 'stock' | 'bond' | 'cash' | 'commodity';
const IsInAssetType: AssetType[] = ['bond', 'cash', 'commodity', 'stock'];

export class CreateAssetDto implements IAsset {
  @MinLength(3)
  name: Name;
  @MinLength(3)
  description: Description;
  @IsIn(IsInRisk)
  risk: Risk;
  @IsString()
  location: Location;
  @IsIn(IsInAssetType)
  type: AssetType;
  @IsOptional()
  isin: Isin;
  @IsOptional()
  wkn: Wkn;
  @IsOptional()
  tickerSymbol: Wkn;
}

export interface AssetQuery extends Partial<IAsset> {}
