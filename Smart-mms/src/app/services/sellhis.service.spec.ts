import { TestBed } from '@angular/core/testing';

import { SellhisService } from './sellhis.service';

describe('SellhisService', () => {
  let service: SellhisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SellhisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
