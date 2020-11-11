import { Injectable, NotFoundException } from '@nestjs/common';
import { TransactionEntity } from './transaction.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TransactionRepository } from './transaction.repository';
import { DeleteResult } from 'typeorm/query-builder/result/DeleteResult';
import { AssetRepository } from '../asset/asset.repository';
import { isUndefined } from 'util';
import { CreateTransactionDto } from '@chris-k-software/api-interfaces';
import { AssetId } from '@chris-k-software/api-interfaces';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(TransactionRepository)
    private transactionRepository: TransactionRepository,
    @InjectRepository(AssetRepository)
    private assetRepository: AssetRepository
  ) {}

  async getAll(): Promise<TransactionEntity[]> {
    return this.transactionRepository.find({ relations: ['asset'] });
  }

  async create(
    createTransactionDto: CreateTransactionDto
  ): Promise<TransactionEntity> {
    const asset = await this.assetRepository.findOne(
      createTransactionDto.assetId
    );
    if (isUndefined(asset)) {
      throw new NotFoundException([
        `Asset with id ${createTransactionDto.assetId} not found, but needed for transaction to be created.`,
      ]);
    }
    return this.transactionRepository.createTransaction(
      createTransactionDto,
      asset
    );
  }

  async delete(id: AssetId): Promise<DeleteResult> {
    const deletedTransaction = await this.transactionRepository.delete(id);
    if (deletedTransaction.affected === 0) {
      throw new NotFoundException(`Transaction with id ${id} not deleted.`);
    }
    return deletedTransaction;
  }
}
