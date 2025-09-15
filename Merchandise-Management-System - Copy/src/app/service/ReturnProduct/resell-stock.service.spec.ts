import { TestBed } from '@angular/core/testing';

import { ResellStockService } from './resell-stock.service';

describe('ResellStockService', () => {
  let service: ResellStockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResellStockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
