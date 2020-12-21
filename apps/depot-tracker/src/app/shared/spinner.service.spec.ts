import { TestBed } from '@angular/core/testing';

import { SpinnerService } from './spinner.service';

describe('SpinnerService', () => {
  let service: SpinnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpinnerService);
  });

  describe('Api', () => {
    it('should have method to show spinner', () => {
      expect(service).toHaveProperty('show');
    });

    it('should have method to hide spinner', () => {
      expect(service).toHaveProperty('hide');
    });

    it('should have observable to subscribe to visibility state', () => {
      expect(service).toHaveProperty('isVisible$');
    });

    it('should have RxJs operator to show spinner', () => {
      expect(service).toHaveProperty('showLoaderOp');
    });

    it('should have RxJs operator to hide spinner', () => {
      expect(service).toHaveProperty('hideLoaderOp');
    });

    it('should have RxJs Operator to show spinner which autohides on completion', () => {
      expect(service).toHaveProperty('showLoaderAutoHideOp');
    });
  });
});
