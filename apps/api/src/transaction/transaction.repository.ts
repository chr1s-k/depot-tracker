import { EntityRepository, Repository } from 'typeorm';
import { TransactionEntity } from './transaction.entity';
import { AssetEntity } from '../asset/asset.entity';
import { CreateTransactionDto } from '@chris-k-software/api-interfaces';

@EntityRepository(TransactionEntity)
export class TransactionRepository extends Repository<TransactionEntity> {
  async createTransaction(
    createTransactionDto: CreateTransactionDto,
    assetEntity: AssetEntity
  ) {
    const { fee, unitCount, unitPrice } = createTransactionDto;
    const transactionEntity = new TransactionEntity();
    transactionEntity.created = new Date();
    transactionEntity.asset = assetEntity;
    transactionEntity.fee = fee;
    transactionEntity.unitCount = unitCount;
    transactionEntity.unitPrice = unitPrice;
    await transactionEntity.save();
    return transactionEntity;
  }
}
