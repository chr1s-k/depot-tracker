import {
  Body,
  Controller,
  Delete,
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
import { CreateTransactionDto, URLS } from '@chris-k-software/api-interfaces';
import type { AssetId } from '@chris-k-software/api-interfaces';

@Controller()
export class TransactionController {
  private log = new Logger('TransactionController');
  constructor(private transactionService: TransactionService) {}

  @Post(URLS.transactionCreateV1)
  @UsePipes(ValidationPipe)
  create(
    @Body() createTransactionDto: CreateTransactionDto
  ): Promise<TransactionEntity> {
    this.log.verbose(
      `Saving transaction with dto ${JSON.stringify(createTransactionDto)}`
    );
    return this.transactionService.create(createTransactionDto);
  }

  @Delete(URLS.transactionDeleteV1)
  @UsePipes(ValidationPipe)
  delete(@Query('id', ParseIntPipe) id: AssetId): Promise<DeleteResult> {
    this.log.verbose(`Deleting transaction with id ${id}`);
    return this.transactionService.delete(id);
  }
}
