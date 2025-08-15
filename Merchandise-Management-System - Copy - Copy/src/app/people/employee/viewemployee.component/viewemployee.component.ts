import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
  searchTerm: string = ''; // 🔍 Search input binding

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    public cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadAllEmp();
  }

  loadAllEmp(): void {
    this.employeeService.getAllEmp().subscribe({
      next: res => {
        this.cdr.markForCheck();
        this.employees = Array.isArray(res) ? res : res?.data || [];
      },
      error: err => {
        console.error('Failed to load employees:', err);
        this.employees = [];
      }
    });
  }

  get filteredEmployees() {
    const term = this.searchTerm.toLowerCase();
    return this.employees.filter(emp =>
      emp.name?.toLowerCase().includes(term) ||
      emp.designation?.toLowerCase().includes(term) ||
      emp.email?.toLowerCase().includes(term)
    );
  }

  updateEmp(id: number): void {
    this.router.navigate(['updateemp', id]);
  }

  deleteEmp(id: number): void {
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
