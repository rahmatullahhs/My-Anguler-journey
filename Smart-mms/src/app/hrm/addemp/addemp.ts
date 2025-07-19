import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee';

@Component({
  selector: 'app-addemp',
  standalone: false,
  templateUrl: './addemp.html',
  styleUrl: './addemp.css',
})
export class Addemp implements OnInit {
  formGroup!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private employeeservice: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      name: [''],
      email: [''],
      phone: [''],
      address: [''],
      gender: [''],
      designation: [''],
      salary: [''],
      photoUrl: [''] // must match the input name
    });
  }

  addEmp(): void {
    if (this.formGroup.invalid) return;

    const employee: Employee = { ...this.formGroup.value };

    this.employeeservice.saveEmp(employee).subscribe({
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
