import { Module } from '@nestjs/common';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionRepository } from './transaction.repository';
import { AssetRepository } from '../asset/asset.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TransactionRepository, AssetRepository])],
  controllers: [TransactionController],
  providers: [TransactionService],
})
export class TransactionModule {}
