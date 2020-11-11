import { Test, TestingModule } from '@nestjs/testing';
import { AssetService } from './asset.service';
import { AssetRepository } from './asset.repository';
import { DeleteResult } from 'typeorm/query-builder/result/DeleteResult';

describe('AssetService', () => {
  let service: AssetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AssetService,
        {
          provide: AssetRepository,
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

    service = module.get<AssetService>(AssetService);
  });

  it('should be defined', () => {
    expect(service).toHaveProperty('getAll');
    expect(service).toHaveProperty('create');
    expect(service).toHaveProperty('delete');
  });

  it('should throw error on delete when id not exist', async () => {
    await expect(() => service.delete(0)).rejects.toThrowError(
      'Asset with id 0 not deleted.'
    );
  });
});
