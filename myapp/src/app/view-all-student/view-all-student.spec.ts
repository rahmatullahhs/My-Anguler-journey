import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllStudent } from './view-all-student';

describe('ViewAllStudent', () => {
  let component: ViewAllStudent;
  let fixture: ComponentFixture<ViewAllStudent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewAllStudent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAllStudent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
