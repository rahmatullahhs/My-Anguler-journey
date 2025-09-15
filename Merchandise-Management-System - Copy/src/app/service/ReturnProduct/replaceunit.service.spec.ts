import { TestBed } from '@angular/core/testing';

import { ReplaceunitService } from './replaceunit.service';

describe('ReplaceunitService', () => {
  let service: ReplaceunitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReplaceunitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
