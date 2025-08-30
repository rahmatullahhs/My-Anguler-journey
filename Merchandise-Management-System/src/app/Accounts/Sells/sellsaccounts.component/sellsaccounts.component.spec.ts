import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellsaccountsComponent } from './sellsaccounts.component';

describe('SellsaccountsComponent', () => {
  let component: SellsaccountsComponent;
  let fixture: ComponentFixture<SellsaccountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SellsaccountsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellsaccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
