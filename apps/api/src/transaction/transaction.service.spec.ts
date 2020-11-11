import { Test, TestingModule } from '@nestjs/testing';
import { TransactionService } from './transaction.service';
import { DeleteResult } from 'typeorm/query-builder/result/DeleteResult';
import { TransactionRepository } from './transaction.repository';
import { AssetRepository } from '../asset/asset.repository';

describe('TransactionService', () => {
  let service: TransactionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionService,
        AssetRepository,
        {
          provide: TransactionRepository,
          useValue: {
            delete: () => {
              const deleteResult = new DeleteResult();
              deleteResult.affected = 0;
              return deleteResult;
            },
          },
        },
      ],
    }).compile();

    service = module.get<TransactionService>(TransactionService);
  });

  it('should be defined', () => {
    expect(service).toHaveProperty('getAll');
    expect(service).toHaveProperty('create');
    expect(service).toHaveProperty('delete');
  });

  it('should throw error on delete when id not exist', async () => {
    await expect(() => service.delete(0)).rejects.toThrowError(
      'Transaction with id 0 not deleted.'
    );
  });
});
