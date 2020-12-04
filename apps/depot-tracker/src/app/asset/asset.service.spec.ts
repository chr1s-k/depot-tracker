import { TestBed } from '@angular/core/testing';

import { Asset, AssetService } from './asset.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AssetDto, CreateAssetDto } from '@chris-k-software/api-interfaces';
import { DeleteResult } from 'typeorm';
import SpyInstance = jest.SpyInstance;

describe('AssetService', () => {
  let service: AssetService;
  let httpTestingController: HttpTestingController;
  let publishAssetsSpy: SpyInstance;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [],
    });
    service = TestBed.inject(AssetService);
    httpTestingController = TestBed.inject(HttpTestingController);

    publishAssetsSpy = jest.spyOn<any, string>(service, 'publishAssets');
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should have properties', () => {
    expect(service).toHaveProperty('create');
    expect(service).toHaveProperty('delete');
    expect(service).toHaveProperty('getAll');
    expect(service).toHaveProperty('symbolTypeahead');
    expect(service).toHaveProperty('publishAssets');
  });

  it('should create asset and publish', (done) => {
    const createAssetDto: CreateAssetDto = {
      type: undefined,
      description: 'testDescription',
      isin: 'testIsin',
      location: 'testLocation',
      name: 'testName',
      risk: 'low',
      wkn: 'testWkn',
      tickerSymbol: '',
    };

    let refAssets;
    service.assets$.subscribe((assets) => {
      refAssets = assets;
    });

    service.create(createAssetDto).subscribe(() => {
      expect(service['assets']).toHaveLength(1);
      expect(publishAssetsSpy).toHaveBeenCalledTimes(1);
      expect(refAssets).toHaveLength(1);
      done();
    });

    const reqs = httpTestingController.match((req) =>
      req.url.includes('ckdepot/v1/asset')
    );

    expect(reqs).toHaveLength(1);
    expect(reqs[0].request.method).toEqual('POST');
    expect(reqs[0].request.body).toEqual(createAssetDto);
    reqs[0].flush(<AssetDto>{
      transactions: [{ unitPrice: 97, fee: 98, unitCount: 99 }],
    });
  });

  it('should delete asset and publish ', (done) => {
    service['assets'] = <Asset[]>[{ id: 0 }, { id: 1 }, { id: 99 }];
    expect(service['assets']).toHaveLength(3);

    let refAssets;
    service.assets$.subscribe((assets) => {
      refAssets = assets;
    });

    service.delete(99).subscribe(() => {
      expect(service['assets']).toHaveLength(2);
      expect(publishAssetsSpy).toHaveBeenCalledTimes(1);
      expect(refAssets).toHaveLength(2);
      done();
    });

    const reqs = httpTestingController.match((req) =>
      req.url.includes('ckdepot/v1/asset')
    );

    expect(reqs).toHaveLength(1);
    expect(reqs[0].request.method).toEqual('DELETE');
    expect(reqs[0].request.params.has('id')).toEqual(true);
    expect(reqs[0].request.params.get('id')).toEqual('99');
    reqs[0].flush(<DeleteResult>{ affected: 1, raw: undefined });
  });

  it('should get all assets and publish ', (done) => {
    let refAssets;
    service.assets$.subscribe((assets) => {
      refAssets = assets;
    });

    service.getAll().subscribe(() => {
      expect(service['assets']).toHaveLength(1);
      expect(publishAssetsSpy).toHaveBeenCalledTimes(1);
      expect(refAssets).toHaveLength(1);
      done();
    });

    const reqs = httpTestingController.match((req) =>
      req.url.includes('ckdepot/v1/asset')
    );

    expect(reqs).toHaveLength(1);
    expect(reqs[0].request.method).toEqual('GET');
    reqs[0].flush(<AssetDto[]>[{ transactions: [] }]);
  });

  it('should get symbol typeahead', () => {
    service.symbolTypeahead('random').subscribe();

    const reqs = httpTestingController.match((req) =>
      req.url.includes('ckdepot/v1/asset/symbol/typeahead')
    );

    expect(reqs).toHaveLength(1);
    expect(reqs[0].request.method).toEqual('GET');
    expect(reqs[0].request.params.has('q')).toEqual(true);
    expect(reqs[0].request.params.get('q')).toEqual('random');
  });
});
