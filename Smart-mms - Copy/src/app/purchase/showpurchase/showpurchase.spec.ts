import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Showpurchase } from './showpurchase';

describe('Showpurchase', () => {
  let component: Showpurchase;
  let fixture: ComponentFixture<Showpurchase>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Showpurchase]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Showpurchase);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
