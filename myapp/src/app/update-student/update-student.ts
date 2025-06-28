import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Student } from '../model/student.model';
import { StudentService } from '../service/student.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-student',
  standalone: false,
  templateUrl: './update-student.html',
  styleUrl: './update-student.css'
})
export class UpdateStudent implements OnInit{

id:string='';
student: Student = new Student();


constructor(
private studentService: StudentService,
private router:Router,
private route:ActivatedRoute,
private cdr : ChangeDetectorRef

){}

  ngOnInit(): void {
  this.loadStudentByid();
  }

loadStudentByid(){

  this.id = this.route.snapshot.params['id'];

  this.studentService.getStudentById(this.id).subscribe({
next:(res)=>{
this.student=res;
this.cdr.markForCheck();
},
error:(err)=>{
console.error('error fetching student: ',err);
}

  });
  
}

updateStudent():void{
this.studentService.updateStudent(this.id,this.student).subscribe({

next:(res)=>this.router.navigate(['/allstu']),
error:(err)=>console.error('update failed',err)
});


}






}
