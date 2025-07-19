import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viewallemp',
  standalone: false,
  templateUrl: './viewallemp.html',
  styleUrl: './viewallemp.css'
})
export class Viewallemp implements OnInit{

employees: any[] = [];

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadAllEmp();
  }

  loadAllEmp() {
    this.employeeService.getAllEmp().subscribe({
      next: res => {
        this.employees = Array.isArray(res) ? res : res.data || [];
      },
      error: err => {
        console.error(err);
        this.employees = [];
      }
    });
  }

  updateEmp(id: string) {
    this.router.navigate(['updateEmp', id]);
  }

  deleteEmp(id: string) {
    if (confirm('Are you sure?')) {
      this.employeeService.deleteEmp(id).subscribe(() => this.loadAllEmp());
    }
  }
}
