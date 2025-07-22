import { TestBed } from '@angular/core/testing';

import { SaletrackingService } from './saletracking.service';

describe('SaletrackingService', () => {
  let service: SaletrackingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaletrackingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
