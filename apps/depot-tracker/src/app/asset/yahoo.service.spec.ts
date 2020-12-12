import { TestBed } from '@angular/core/testing';

import { YahooService } from './yahoo.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('YahooService', () => {
  let service: YahooService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(YahooService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get symbol typeahead', () => {
    service.symbolTypeahead$('random').subscribe();

    const reqs = httpTestingController.match((req) =>
      req.url.includes('ckdepot/v1/asset/symbol/typeahead')
    );

    expect(reqs).toHaveLength(1);
    expect(reqs[0].request.method).toEqual('GET');
    expect(reqs[0].request.params.has('q')).toEqual(true);
    expect(reqs[0].request.params.get('q')).toEqual('random');
  });
});
