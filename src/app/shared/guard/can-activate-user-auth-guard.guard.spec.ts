import { TestBed } from '@angular/core/testing';

import { CanActivateUserAuthGuardGuard } from './can-activate-user-auth-guard.guard';

describe('CanActivateUserAuthGuardGuard', () => {
  let guard: CanActivateUserAuthGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CanActivateUserAuthGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
