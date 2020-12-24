import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { AuthModule } from './auth.module';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [AuthModule.forRoot()] });
    service = TestBed.inject(AuthService);
  });

  it('should have properties', () => {
    expect(service).toHaveProperty('login');
    expect(service).toHaveProperty('logout');
    expect(service).toHaveProperty('logoutAndRevokeToken');
    expect(service).toHaveProperty('init');
    expect(service).toHaveProperty('oauthService');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
