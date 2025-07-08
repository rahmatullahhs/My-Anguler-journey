import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Employee } from '../../models/employee';
import { EmployeeService } from '../../services/employee.service';


@Component({
  selector: 'app-updateemployee',
  standalone: false,
  templateUrl: './updateemp.html',
  styleUrl: './updateemp.css'
})
export class Updateemp implements OnInit {
  id!: string;
  employee: Employee = new Employee();


  constructor(
    private employeeService: EmployeeService,
 
    private router: Router,
    private activeRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
   
    this.id = this.activeRoute.snapshot.params['id'];

    this.loadAllEmloyees();

  }

  loadAllEmloyees(): void {
    this.employeeService.getById(this.id).subscribe({
      next: (res) => {
        this.employee = res;
        this.cdr.detectChanges();
        console.log(res);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  updateEmp() {
    this.employeeService.updateEmp(this.id, this.employee).subscribe({
      next: (res) => {
        this.router.navigate(['allemployees'])
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  
}
