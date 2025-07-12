import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Employee } from '../../models/employee';

@Component({
  selector: 'app-addemp',
  standalone: false,
  templateUrl: './addemp.html',
  styleUrl: './addemp.css'
})
export class Addemp implements OnInit {

 formGroup !: FormGroup;

  constructor(
    private employeeservice: EmployeeService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }


  ngOnInit(): void {

    this.formGroup = this.formBuilder.group({
      name: [''],
      email: [''],
      phone: [''],
      gender: [''],
      designation: [''],
      salary: [''],
      address: ['']

    });

  }


  addEmp(): void {

    const employee: Employee = { ...this.formGroup.value };

    this.employeeservice.saveEmp(employee).subscribe({

      next: (res) => {

        console.log("Employee Saved ", res);
        this.formGroup.reset();
        this.router.navigate(['/viewallemp']);

      },

      error: (error) => {

        console.log(error);

      }



    })


  }







}














