import { Test, TestingModule } from '@nestjs/testing';
import { AssetController } from './asset.controller';
import { AssetRepository } from './asset.repository';
import { AssetService } from './asset.service';
import { AssetEntity } from './asset.entity';
import { CreateAssetDto } from '@chris-k-software/api-interfaces';

describe('AssetController', () => {
  let controller: AssetController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssetController],
      providers: [
        {
          provide: AssetService,
          useValue: {
            create: () => new AssetEntity(),
          },
        },
        { provide: AssetRepository, useValue: {} },
      ],
    }).compile();

    controller = module.get<AssetController>(AssetController);
  });

  it('should have methods', () => {
    expect(controller).toHaveProperty('create');
    expect(controller).toHaveProperty('getAll');
    expect(controller).toHaveProperty('delete');
    expect(controller).toHaveProperty('log');
  });

  // This test doesnt make sense, since it checks the mocked return value
  it('should return asset on create', async () => {
    const createAssetDto: CreateAssetDto = {
      type: undefined,
      description: '',
      isin: '',
      location: '',
      name: '',
      risk: 'low',
      wkn: '',
      tickerSymbol: '',
    };
    const asset = await controller.create(createAssetDto);
    expect(asset).toBeInstanceOf(AssetEntity);
  });
});
