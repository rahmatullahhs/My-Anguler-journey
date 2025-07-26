import { TestBed } from '@angular/core/testing';

import { PurchasehisService } from './purchasehis.service';

describe('PurchasehisService', () => {
  let service: PurchasehisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PurchasehisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
