import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentService } from './student.service';

describe('StudentService', () => {
  let component: StudentService;
  let fixture: ComponentFixture<StudentService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
