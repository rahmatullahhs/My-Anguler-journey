import { TestBed } from '@angular/core/testing';

import { LedgerbookService } from './ledgerbook.service';

describe('LedgerbookService', () => {
  let service: LedgerbookService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LedgerbookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
