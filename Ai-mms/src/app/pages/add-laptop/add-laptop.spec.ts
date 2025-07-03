import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLaptop } from './add-laptop';

describe('AddLaptop', () => {
  let component: AddLaptop;
  let fixture: ComponentFixture<AddLaptop>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddLaptop]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddLaptop);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
