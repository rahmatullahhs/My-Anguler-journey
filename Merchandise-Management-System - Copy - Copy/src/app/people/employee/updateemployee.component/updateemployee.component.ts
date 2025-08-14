import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { EmployeeModel } from '../../../models/human/employee.model';
import { EmployeeService } from '../../../service/mankind/employee.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-updateemployee.component',
  standalone: false,
  templateUrl: './updateemployee.component.html',
  styleUrls: ['./updateemployee.component.css'] // Fixed typo
})
export class UpdateemployeeComponent implements OnInit {
  id!: number;
  employee!: EmployeeModel;

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadEmployeeById();
  }

  loadEmployeeById(): void {
    this.id = +this.activeRoute.snapshot.params['id']; // Convert to number
    this.employeeService.getEmployeeById(this.id).subscribe({
      next: (res) => {
        this.employee = res;
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Error fetching employee:', error);
      }
    });
  }
  onSubmit(): void {
    this.updateEmp();
    this.router.navigate(['/viewemp']);
  }
  updateEmp(): void {
    this.employeeService.updateEmp(this.id, this.employee).subscribe({
      next: () => {
        this.router.navigate(['/viewemp']);

        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Error updating employee:', error);
      }
    });
  }
}
