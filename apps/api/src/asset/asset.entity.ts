import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TransactionEntity } from '../transaction/transaction.entity';
import type { IAsset, AssetId } from '@chris-k-software/api-interfaces';

@Entity()
export class AssetEntity extends BaseEntity implements IAsset {
  @PrimaryGeneratedColumn()
  id: AssetId;

  @Column()
  created: Date;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  risk: string;

  @Column()
  location: string;

  @Column()
  isin: string;

  @Column()
  wkn: string;

  @OneToMany(
    () => TransactionEntity,
    (transactionEntity) => transactionEntity.asset
  )
  transactions: TransactionEntity[];
}
