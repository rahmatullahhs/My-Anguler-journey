import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
export class AddemployeeComponent implements OnInit {

  formGroup!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private employeeservice: EmployeeService,
    private router: Router,
    public cdr:ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      name: [''],
      email: [''],
      phone: [''],
      address: [''],
      gender: [''],
      designation: [''],
      salary: ['']
    });
  }


  addEmp(): void {
    if (this.formGroup.invalid) return;

    const employee: EmployeeModel = { ...this.formGroup.value };

    this.employeeservice.addEmp(employee).subscribe({
      next: (res) => {
        console.log('Employee Saved:', res);
        this.cdr.markForCheck();
        this.formGroup.reset();
        this.router.navigate(['/viewemp']);
      },
      error: (error) => {
        console.error('Error:', error);
      }
    });
  }



}
