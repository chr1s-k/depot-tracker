import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TransactionEntity } from '../transaction/transaction.entity';
import type { IAsset, AssetId } from '@chris-k-software/api-interfaces';

// interface is used for overriding properties that have a type that is not supported by Typeorm
interface ITypeOrmWorkaround {
  risk: string;
  type: string;
}

@Entity()
export class AssetEntity extends BaseEntity
  implements Omit<IAsset, 'risk' | 'type'>, ITypeOrmWorkaround {
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

  @Column()
  tickerSymbol: string;

  @Column()
  type: string;

  @OneToMany(
    () => TransactionEntity,
    (transactionEntity) => transactionEntity.asset
  )
  transactions: TransactionEntity[];
}
