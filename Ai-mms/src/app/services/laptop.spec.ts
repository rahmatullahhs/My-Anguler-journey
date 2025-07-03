import { TestBed } from '@angular/core/testing';

import { Laptop } from './laptop';

describe('Laptop', () => {
  let service: Laptop;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Laptop);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
