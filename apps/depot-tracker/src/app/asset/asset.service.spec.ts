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
      providers: [],
    });
    service = TestBed.inject(AssetService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should have methods', () => {
    expect(service).toHaveProperty('create');
  });

  it('should execute http post', () => {
    const createAssetDto: CreateAssetDto = {
      description: 'testDescription',
      isin: 'testIsin',
      location: 'testLocation',
      name: 'testName',
      risk: 'testRisk',
      wkn: 'testWkn',
    };
    service.create(createAssetDto).subscribe();
    const reqs = httpTestingController.match((req) =>
      req.url.includes('create')
    );
    expect(reqs).toHaveLength(1);
    expect(reqs[0].request.body).toEqual(createAssetDto);
  });
});
