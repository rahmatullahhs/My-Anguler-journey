import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Accountpayentry } from './accountpayentry';

describe('Accountpayentry', () => {
  let component: Accountpayentry;
  let fixture: ComponentFixture<Accountpayentry>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Accountpayentry]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Accountpayentry);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
