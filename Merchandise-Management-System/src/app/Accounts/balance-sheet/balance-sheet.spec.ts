import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceSheet } from './balance-sheet';

describe('BalanceSheet', () => {
  let component: BalanceSheet;
  let fixture: ComponentFixture<BalanceSheet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BalanceSheet]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BalanceSheet);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
