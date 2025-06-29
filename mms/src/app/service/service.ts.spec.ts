import { TestBed } from '@angular/core/testing';

import { ServiceTs } from './service.ts';

describe('ServiceTs', () => {
  let service: ServiceTs;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceTs);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
