import { IsDefined, IsPositive } from 'class-validator';
import type { AssetId } from './api-asset-interface';

export interface ITransaction {
  fee: Fee;
  unitPrice: UnitPrice;
  unitCount: UnitCount;
}

export type Fee = number;
export type UnitPrice = number;
export type UnitCount = number;

export class CreateTransactionDto implements ITransaction {
  @IsPositive()
  assetId: AssetId;
  @IsDefined()
  fee: Fee;
  @IsPositive()
  unitCount: UnitCount;
  @IsDefined()
  unitPrice: UnitPrice;
}

export interface TransactionQuery extends Partial<ITransaction> {}
