import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashierProfile } from './cashier-profile';

describe('CashierProfile', () => {
  let component: CashierProfile;
  let fixture: ComponentFixture<CashierProfile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CashierProfile]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CashierProfile);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
