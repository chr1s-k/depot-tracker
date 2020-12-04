import { Test, TestingModule } from '@nestjs/testing';
import { AssetService, HistoricalDataDto } from './asset.service';
import { AssetRepository } from './asset.repository';
import { HttpModule, HttpService } from '@nestjs/common';
import { AssetEntity } from './asset.entity';
import { CreateAssetDto, Quote } from '@chris-k-software/api-interfaces';
import { DeleteResult } from 'typeorm';
import { of } from 'rxjs';
import { AxiosResponse } from 'axios';

describe('AssetService', () => {
  let service: AssetService;
  let assetRepo: AssetRepository;
  let http: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        AssetService,
        {
          provide: AssetRepository,
          useClass: AssetRepository,
        },
      ],
    }).compile();
    service = module.get<AssetService>(AssetService);
    assetRepo = module.get<AssetRepository>(AssetRepository);
    http = module.get<HttpService>(HttpService);
  });

  describe('pure helper functions', () => {
    it('should return latest price', () => {
      const mockData: Partial<HistoricalDataDto> = {
        prices: [
          {
            adjclose: 0,
            close: 0,
            date: 0,
            high: 0,
            low: 0,
            open: 0,
            volume: 0,
          },
          {
            adjclose: 1,
            close: 1,
            date: 1,
            high: 1,
            low: 1,
            open: 1,
            volume: 1,
          },
        ],
      };
      expect(service['latestPrice'](mockData as HistoricalDataDto)).toEqual(
        mockData.prices[0]
      );
    });
  });

  describe('properties', () => {
    it('should have properties', () => {
      expect(service).toHaveProperty('getAll');
      expect(service).toHaveProperty('create');
      expect(service).toHaveProperty('delete');
      expect(service).toHaveProperty('assetDetails');
      expect(service).toHaveProperty('symbolTypeahead');
      expect(service).toHaveProperty('latestPrice');
    });
  });

  it('should return all AssetEntities', async () => {
    const expected = [{} as AssetEntity, {} as AssetEntity];
    const findSpy = jest.spyOn(assetRepo, 'find').mockResolvedValue(expected);
    const res = await service.getAll();
    expect(res).toHaveLength(2);
    expect(res).toEqual(expected);
    expect(findSpy).toHaveBeenCalledTimes(1);
    expect(findSpy).toHaveBeenCalledWith({ relations: ['transactions'] });
  });

  it('should create Asset and return it', async () => {
    const mockAsset = { name: 'test' };
    const createAssetSpy = jest
      .spyOn(assetRepo, 'createAsset')
      .mockResolvedValue(mockAsset as AssetEntity);
    const res = await service.create(mockAsset as CreateAssetDto);
    expect(res).toEqual(mockAsset);
    expect(createAssetSpy).toHaveBeenCalledTimes(1);
    expect(createAssetSpy).toHaveBeenCalledWith(mockAsset);
  });

  it('should throw error on delete when id not exist', async () => {
    const id = 0;
    const deleteSpy = jest
      .spyOn(assetRepo, 'delete')
      .mockResolvedValue(<DeleteResult>{ affected: 0, raw: undefined });
    await expect(() => service.delete(id)).rejects.toThrowError(
      'Asset with id 0 not deleted.'
    );
    expect(deleteSpy).toHaveBeenCalledTimes(1);
    expect(deleteSpy).toHaveBeenCalledWith(id);
  });

  it('should return delete result', async () => {
    const id = 0;
    const deleteResultMock: DeleteResult = { affected: 1, raw: {} };
    const deleteSpy = jest
      .spyOn(assetRepo, 'delete')
      .mockResolvedValue(deleteResultMock);
    const deleteResult = await service.delete(id);
    expect(deleteResult).toEqual(deleteResultMock);
    expect(deleteSpy).toHaveBeenCalledTimes(1);
    expect(deleteSpy).toHaveBeenCalledWith(id);
  });

  it('should return asset details', async () => {
    const expectedReturn: unknown = { price: 'test' };
    const mockResponse: Partial<AxiosResponse> = {
      data: { prices: [expectedReturn, {}] },
    };
    const getSpy = jest
      .spyOn(http, 'get')
      .mockImplementationOnce(() => of(mockResponse as AxiosResponse));

    const res = await service.assetDetails('random');
    expect(res).toEqual(expectedReturn);
    expect(getSpy).toHaveBeenCalledTimes(1);
  });

  it('should return typeahead value', async () => {
    const expectedReturn: Quote[] = [
      {
        exchange: 'NYQ',
        shortname: 'Masco Corporation',
        quoteType: 'EQUITY',
        symbol: 'MAS',
        index: 'quotes',
        score: 2436700,
        typeDisp: 'Equity',
        longname: 'Masco Corporation',
        isYahooFinance: true,
      },
    ];
    const mockResponse: Partial<AxiosResponse> = {
      data: {
        quotes: expectedReturn,
      },
    };
    const getSpy = jest
      .spyOn(http, 'get')
      .mockImplementationOnce(() => of(mockResponse as AxiosResponse));

    const res = await service.symbolTypeahead('random');
    expect(res).toEqual(expectedReturn);
    expect(getSpy).toHaveBeenCalledTimes(1);
  });
});
