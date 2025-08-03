import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from '../../../service/mankind/employee.service';
import { Router } from '@angular/router';
import { EmployeeModel } from '../../../models/human/employee.model';

@Component({
  selector: 'app-addemployee.component',
  standalone: false,
  templateUrl: './addemployee.component.html',
  styleUrl: './addemployee.component.css'
})
export class AddemployeeComponent  implements OnInit{
formGroup!:FormGroup;
constructor(
private fb:FormBuilder,
private employeeservice : EmployeeService,
private router: Router
){}

 ngOnInit(): void {
    this.formGroup = this.fb.group({
      name: [''],
      email: [''],
      phone: [''],
      nid:[''],
      address: [''],
      gender: [''],
      designation: [''],
      salary: [''],
      photoUrl: [''] // must match the input name
    });
    
  }
addEmp(): void {
    if (this.formGroup.invalid) return;

    const employeemodel: EmployeeModel = { ...this.formGroup.value };

    this.employeeservice.addEmp(employeemodel).subscribe({
      next: (res) => {
        console.log('Employee Saved:', res);
        this.formGroup.reset();
        this.router.navigate(['/viewallemp']);
      },
      error: (error) => {
        console.error('Error:', error);
      }
    });
  }








}
