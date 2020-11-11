import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  ParseIntPipe,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TransactionEntity } from './transaction.entity';
import { TransactionService } from './transaction.service';
import { DeleteResult } from 'typeorm/query-builder/result/DeleteResult';
import { CreateTransactionDto } from '@chris-k-software/api-interfaces';
import type { AssetId } from '@chris-k-software/api-interfaces';

@Controller('v1/transaction')
export class TransactionController {
  private log = new Logger('TransactionController');
  constructor(private transactionService: TransactionService) {}

  @Post()
  @UsePipes(ValidationPipe)
  create(
    @Body() createTransactionDto: CreateTransactionDto
  ): Promise<TransactionEntity> {
    this.log.verbose(
      `Saving transaction with dto ${JSON.stringify(createTransactionDto)}`
    );
    return this.transactionService.create(createTransactionDto);
  }

  @Delete()
  @UsePipes(ValidationPipe)
  delete(@Query('id', ParseIntPipe) id: AssetId): Promise<DeleteResult> {
    this.log.verbose(`Deleting transaction with id ${id}`);
    return this.transactionService.delete(id);
  }

  @Get()
  @UsePipes(ValidationPipe)
  getAll(): Promise<TransactionEntity[]> {
    this.log.verbose(`Getting all transactions.`);
    return this.transactionService.getAll();
  }
}
