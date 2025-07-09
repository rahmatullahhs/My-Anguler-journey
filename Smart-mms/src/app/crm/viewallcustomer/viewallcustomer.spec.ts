import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Viewallcustomer } from './viewallcustomer';

describe('Viewallcustomer', () => {
  let component: Viewallcustomer;
  let fixture: ComponentFixture<Viewallcustomer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Viewallcustomer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Viewallcustomer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
