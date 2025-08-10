import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../../service/mankind/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viewemployee.component',
  standalone: false,
  templateUrl: './viewemployee.component.html',
  styleUrl: './viewemployee.component.css'
})
export class ViewemployeeComponent implements OnInit {
employees: any[] = [];

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadAllEmp();
  }

  loadAllEmp(): void {
    this.employeeService.getAllEmp().subscribe({
      next: res => {
        // Defensive check and fallback if API structure is dynamic
        this.employees = Array.isArray(res) ? res : res?.data || [];
      },
      error: err => {
        console.error('Failed to load employees:', err);
        this.employees = [];
      }
    });
  }

  updateEmp(id: string): void {
    this.router.navigate(['updateEmp', id]);
  }

  deleteEmp(id: string): void {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmp(id).subscribe({
        next: () => {
          this.loadAllEmp();
        },
        error: err => {
          console.error('Error deleting employee:', err);
        }
      });
    }
  }
  
}
