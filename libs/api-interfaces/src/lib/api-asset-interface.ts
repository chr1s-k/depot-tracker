import { IsDefined, IsOptional, MinLength } from 'class-validator';
import { TransactionDto } from './api-transaction-interface';

export interface IAsset {
  name: Name;
  description: Description;
  risk: Risk;
  location: Location;
  isin: Isin;
  wkn: Wkn;
}

export interface AssetDto extends IAsset {
  id: AssetId;
  created: Date;
  transactions: TransactionDto[];
}

export type AssetId = number;
export type Name = string;
export type Description = string;
export type Risk = 'high' | 'middle' | 'low';
export type Location = string;
export type Isin = string;
export type Wkn = string;

export class CreateAssetDto implements IAsset {
  @MinLength(3)
  name: Name;
  @MinLength(3)
  description: Description;
  @IsDefined()
  risk: Risk;
  @IsDefined()
  location: Location;
  @IsOptional()
  isin: Isin;
  @IsOptional()
  wkn: Wkn;
}

export interface AssetQuery extends Partial<IAsset> {}
