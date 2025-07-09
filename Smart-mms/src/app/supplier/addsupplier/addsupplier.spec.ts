import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Addsupplier } from './addsupplier';

describe('Addsupplier', () => {
  let component: Addsupplier;
  let fixture: ComponentFixture<Addsupplier>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Addsupplier]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Addsupplier);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
