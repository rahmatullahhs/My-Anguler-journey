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
  selectedFile: File | null = null;


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
      salary: [''],
       
    });
  }

onFileSelected(event: any) {
  const file = event.target.files[0];
  if (file) {
    this.selectedFile = file;
  }
}



addEmp(): void {
  if (this.formGroup.invalid) return;

  const formData = new FormData();
  const employee = { ...this.formGroup.value };

  formData.append('employee', JSON.stringify(employee));

  if (this.selectedFile) {
    formData.append('photo', this.selectedFile);
  }

  this.employeeservice.addEmployee(formData).subscribe({
    next: (res) => {
      console.log('Employee added successfully', res);
      this.formGroup.reset();
      this.selectedFile = null;
      this.router.navigate(['/viewemp']);
    },
    error: (err) => {
      console.error('Error:', err);
    }
  });
}
}