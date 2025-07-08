import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viewallemp',
  standalone: false,
  templateUrl: './viewallemp.html',
  styleUrl: './viewallemp.css'
})
export class Viewallemp implements OnInit{

employees:any;

constructor(private employeeService: EmployeeService,
  private router: Router,
    private cdr: ChangeDetectorRef
){}


  ngOnInit(): void {
    this.loadAllEmp();
  }

loadAllEmp():void{

this.employees=this.employeeService.getAllEmp();


}





  viewAllEmp() {
    this.employees = this.employeeService.getAllEmp();
  }

  deleteEmp(id: string): void {
    this.employeeService.deleteEmp(id).subscribe({
      next: (res) => {
        console.log(res);
        this.cdr.reattach();
        this.viewAllEmp();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  updateEmp(id: string){
    this.router.navigate(['updateEmp', id]);
  }
}



