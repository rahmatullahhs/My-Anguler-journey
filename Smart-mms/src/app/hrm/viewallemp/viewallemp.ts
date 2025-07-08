import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee';

@Component({
  selector: 'app-viewallemp',
  standalone: false,
  templateUrl: './viewallemp.html',
  styleUrl: './viewallemp.css'
})
export class Viewallemp implements OnInit{

employees:any;

constructor(private employeeService: EmployeeService){}


  ngOnInit(): void {
    this.loadAllEmp();
  }

loadAllEmp(){

this.employees=this.employeeService.getAllEmp


}






}
