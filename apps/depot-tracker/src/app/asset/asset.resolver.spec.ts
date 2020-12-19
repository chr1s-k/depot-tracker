import { TestBed } from '@angular/core/testing';

import { AssetResolver } from './asset.resolver';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AssetResolverService', () => {
  let service: AssetResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(AssetResolver);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
