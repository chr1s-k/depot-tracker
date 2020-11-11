import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AssetEntity } from '../asset/asset.entity';
import { ITransaction } from '@chris-k-software/api-interfaces';

@Entity()
export class TransactionEntity extends BaseEntity implements ITransaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  created: Date;

  @Column()
  fee: number;

  @Column()
  unitPrice: number;

  @Column()
  unitCount: number;

  @ManyToOne(() => AssetEntity, (asset) => asset.transactions)
  asset: AssetEntity;
}
