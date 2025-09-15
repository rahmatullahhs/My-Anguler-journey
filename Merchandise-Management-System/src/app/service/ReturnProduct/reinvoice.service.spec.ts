import { TestBed } from '@angular/core/testing';

import { ReinvoiceService } from './reinvoice.service';

describe('ReinvoiceService', () => {
  let service: ReinvoiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReinvoiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
