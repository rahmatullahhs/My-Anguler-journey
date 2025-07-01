import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../service/student.service';
import { Student } from '../model/student.model';

@Component({
  selector: 'app-update-student',
  standalone: false,
  templateUrl: './update-student.html',
  styleUrl: './update-student.css'
})
export class UpdateStudent implements OnInit {

  id: string = '';
  student: Student = new Student();
  // studentService: A service that interacts with the backend API for student data.
  // router: Used to navigate between pages.
  // route: Used to access route parameters (like the student ID).
  // cdr (ChangeDetectorRef): Manually triggers change detection in case Angular doesn't detect changes automatically.

  constructor(
    private studentService: StudentService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef

  ) { }

  ngOnInit(): void {
    this.loadStudentByid();
  }

  loadStudentByid() {

    this.id = this.route.snapshot.params['id'];

    this.studentService.getStudentById(this.id).subscribe({
      next: (res) => {
        this.student = res;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('error fetching student: ', err);
      }

    });

  }

  updateStudent(): void {
    this.studentService.updateStudent(this.id, this.student).subscribe({

      next: (res) => this.router.navigate(['/allstu']),
      error: (err) => console.error('update failed', err)
    });


  }






}
