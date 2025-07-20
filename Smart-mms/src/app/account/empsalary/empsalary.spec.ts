import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Empsalary } from './empsalary';

describe('Empsalary', () => {
  let component: Empsalary;
  let fixture: ComponentFixture<Empsalary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Empsalary]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Empsalary);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
