import { TestBed } from '@angular/core/testing';

import { SpinnerInterceptor } from './spinner.interceptor';

describe('SpinnerInterceptor', () => {
  let interceptor: SpinnerInterceptor;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpinnerInterceptor],
    });
    interceptor = TestBed.inject(SpinnerInterceptor);
  });

  it('should have properties', () => {
    expect(interceptor).toHaveProperty('intercept');
    expect(interceptor).toHaveProperty('spinner');
  });
});
