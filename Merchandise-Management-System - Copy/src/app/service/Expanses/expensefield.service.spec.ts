import { TestBed } from '@angular/core/testing';

import { ExpensefieldService } from './expensefield.service';

describe('ExpensefieldService', () => {
  let service: ExpensefieldService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpensefieldService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
