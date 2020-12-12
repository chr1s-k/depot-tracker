import { TestBed } from '@angular/core/testing';

import { AssetService } from './asset.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { CreateAssetDto } from '@chris-k-software/api-interfaces';

describe('AssetService', () => {
  let service: AssetService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(AssetService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should have properties', () => {
    expect(service).toHaveProperty('create$');
    expect(service).toHaveProperty('delete$');
    expect(service).toHaveProperty('all$');
  });

  it('should create asset and publish', () => {
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

    service.create$(createAssetDto).subscribe();

    const reqs = httpTestingController.match((req) =>
      req.url.includes('ckdepot/v1/asset')
    );

    expect(reqs).toHaveLength(1);
    expect(reqs[0].request.method).toEqual('POST');
    expect(reqs[0].request.body).toEqual(createAssetDto);
  });

  it('should delete asset and publish ', () => {
    service.delete$(99).subscribe();

    const reqs = httpTestingController.match((req) =>
      req.url.includes('ckdepot/v1/asset')
    );

    expect(reqs).toHaveLength(1);
    expect(reqs[0].request.method).toEqual('DELETE');
    expect(reqs[0].request.params.has('id')).toEqual(true);
    expect(reqs[0].request.params.get('id')).toEqual('99');
  });

  it('should get all assets and publish ', () => {
    service.all$().subscribe();

    const reqs = httpTestingController.match((req) =>
      req.url.includes('ckdepot/v1/asset')
    );

    expect(reqs).toHaveLength(1);
    expect(reqs[0].request.method).toEqual('GET');
  });
});
