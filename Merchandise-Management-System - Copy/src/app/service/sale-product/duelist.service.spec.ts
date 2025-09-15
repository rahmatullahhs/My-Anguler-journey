import { TestBed } from '@angular/core/testing';

import { DuelistService } from './duelist.service';

describe('DuelistService', () => {
  let service: DuelistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DuelistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
