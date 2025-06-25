import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { StudentService } from '../service/student.service';
import { Route, Router } from '@angular/router';


@Component({
  selector: 'app-view-all-student',
  standalone: false,
  templateUrl: './view-all-student.html',
  styleUrl: './view-all-student.css'
})
export class ViewAllStudent implements OnInit {
  students: any;

  constructor(
    private studentService: StudentService,
private router:Router,
private cdr:ChangeDetectorRef



  ) { }

  ngOnInit(): void {
    this.loadAllStudent();
  }

  loadAllStudent() {
    this.students = this.studentService.getAllStudent();

  }

deleteStudent(id:string):void{
  this.studentService.deleteStudent(id).subscribe({
next:()=>{
console.log('Student delete');
this.loadAllStudent();
this.cdr.reattach();



},
error:(err)=>{

console.log('error deleting student',err);

}



  });






}



  
}



