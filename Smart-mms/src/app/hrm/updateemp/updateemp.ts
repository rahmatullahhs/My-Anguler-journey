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
   
    // this.id = this.activeRoute.snapshot.params['id'];
    this.loadAllEmp();

  }

  loadAllEmp(): void {
      this.id = this.activeRoute.snapshot.params['id'];

    this.employeeService.getById(this.id).subscribe({
      next: (res) => {
        this.employee = res;
        this.cdr.markForCheck();
        
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  updateEmp():void {
    this.employeeService.updateEmp(this.id, this.employee).subscribe({
      next: () => {
        this.router.navigate(['/viewallemp'])
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  
}
