import { IsDefined, IsNumber, IsPositive, Min } from 'class-validator';
import type { AssetId } from './api-asset-interface';

export interface ITransaction {
  fee: Fee;
  unitPrice: UnitPrice;
  unitCount: UnitCount;
  note: Note;
}

export interface TransactionDto extends ITransaction {
  id: TransactionId;
  created: Date;
}

export type TransactionId = number;
export type Fee = number;
export type UnitPrice = number;
export type UnitCount = number;
export type Note = string;

export class CreateTransactionDto implements ITransaction {
  @IsPositive()
  assetId: AssetId;
  @Min(0)
  fee: Fee;
  @IsNumber()
  unitCount: UnitCount;
  @Min(0)
  unitPrice: UnitPrice;
  @IsDefined()
  note: Note;
}

export interface TransactionQuery extends Partial<ITransaction> {}
