import { TestBed } from '@angular/core/testing';

import { LoaderService } from './loader.service';

describe('LoaderService', () => {
  let service: LoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have method to show loader', () => {
    expect(service).toHaveProperty('show');
    expect(service).toHaveProperty('hide');
    expect(service).toHaveProperty('isVisibleSubject');
  });
});
