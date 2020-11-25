import { TestBed } from '@angular/core/testing';

import { TransactionService } from './transaction.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('TransactionService', () => {
  let service: TransactionService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(TransactionService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create http delete call', () => {
    service.delete(1).subscribe();
    const reqs = httpTestingController.match((req) =>
      req.url.includes('ckdepot/v1/transaction')
    );
    expect(reqs).toHaveLength(1);
  });
});
