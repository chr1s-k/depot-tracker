import { Test, TestingModule } from '@nestjs/testing';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { TransactionEntity } from './transaction.entity';
import { TransactionRepository } from './transaction.repository';

describe('TransactionController', () => {
  let controller: TransactionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionController],
      providers: [
        {
          provide: TransactionService,
          useValue: {
            create: () => new TransactionEntity(),
          },
        },
        { provide: TransactionRepository, useValue: {} },
      ],
    }).compile();

    controller = module.get<TransactionController>(TransactionController);
  });

  it('should have methods', () => {
    expect(controller).toHaveProperty('create');
    expect(controller).toHaveProperty('delete');
    expect(controller).toHaveProperty('log');
  });
});
