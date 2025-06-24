import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllEmp } from './view-all-emp';

describe('ViewAllEmp', () => {
  let component: ViewAllEmp;
  let fixture: ComponentFixture<ViewAllEmp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewAllEmp]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAllEmp);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
