import { IsDefined, IsOptional, MinLength } from 'class-validator';

export interface IAsset {
  name: Name;
  description: Description;
  risk: Risk;
  location: Location;
  isin: Isin;
  wkn: Wkn;
}

export type AssetId = number;
export type Name = string;
export type Description = string;
export type Risk = 'high' | 'low' | string;
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
