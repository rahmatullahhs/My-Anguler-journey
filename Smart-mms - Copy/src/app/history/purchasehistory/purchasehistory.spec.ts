import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Purchasehistory } from './purchasehistory';

describe('Purchasehistory', () => {
  let component: Purchasehistory;
  let fixture: ComponentFixture<Purchasehistory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Purchasehistory]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Purchasehistory);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
