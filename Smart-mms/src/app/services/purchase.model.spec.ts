import { TestBed } from '@angular/core/testing';

import { PurchaseModel } from './purchase.model';

describe('PurchaseModel', () => {
  let service: PurchaseModel;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PurchaseModel);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
