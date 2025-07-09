import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Updatecustomer } from './updatecustomer';

describe('Updatecustomer', () => {
  let component: Updatecustomer;
  let fixture: ComponentFixture<Updatecustomer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Updatecustomer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Updatecustomer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
