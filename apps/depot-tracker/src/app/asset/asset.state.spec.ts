import { TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { AssetState } from './asset.state';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AssetDto } from '@chris-k-software/api-interfaces';

describe('AssetState', () => {
  let store: Store;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, NgxsModule.forRoot([AssetState])],
    });
    store = TestBed.inject(Store);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should get assets on initialization', () => {
    const reqs = httpTestingController.match((req) =>
      req.url.includes('ckdepot/v1/asset')
    );
    expect(reqs).toHaveLength(1);
    expect(reqs[0].request.method).toEqual('GET');
  });

  it('it should select one asset after receiving one from backend', () => {
    const reqs = httpTestingController.match((req) =>
      req.url.includes('ckdepot/v1/asset')
    );
    reqs[0].flush(<AssetDto[]>[{ id: 99, transactions: [] }]);

    const assets = store.selectSnapshot(AssetState.getAssets);
    expect(assets).toHaveLength(1);
    expect(assets[0].id).toEqual(99);
  });
});
