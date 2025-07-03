import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLaptop } from './edit-laptop';

describe('EditLaptop', () => {
  let component: EditLaptop;
  let fixture: ComponentFixture<EditLaptop>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditLaptop]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditLaptop);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
