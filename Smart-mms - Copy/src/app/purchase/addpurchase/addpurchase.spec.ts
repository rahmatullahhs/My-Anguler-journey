import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Addpurchase } from './addpurchase';

describe('Addpurchase', () => {
  let component: Addpurchase;
  let fixture: ComponentFixture<Addpurchase>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Addpurchase]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Addpurchase);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
