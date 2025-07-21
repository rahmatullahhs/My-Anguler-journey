import { TestBed } from '@angular/core/testing';

import { AddentryService } from './addentry.service';

describe('AddentryService', () => {
  let service: AddentryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddentryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
