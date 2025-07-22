import { TestBed } from '@angular/core/testing';

import { BilltrackingService } from './billtracking.service';

describe('BilltrackingService', () => {
  let service: BilltrackingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BilltrackingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
