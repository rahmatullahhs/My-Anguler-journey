import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Viewbrand } from './viewbrand';

describe('Viewbrand', () => {
  let component: Viewbrand;
  let fixture: ComponentFixture<Viewbrand>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Viewbrand]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Viewbrand);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
