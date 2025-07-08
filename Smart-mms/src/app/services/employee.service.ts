import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  baseUrl: string = "http://localhost:3000/employee";



  constructor(private http: HttpClient) { }


 // To Get All Employees
  getAllEmp(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  // To Add New Employee
  saveEmp(employee: Employee): Observable<any> {
    return this.http.post(this.baseUrl, employee);
  }

  // To Delete Employee
  deleteEmp(id: string): Observable<any>{
    return this.http.delete(this.baseUrl+"/"+id);
  }

  // To Find Employee By ID
  getById(id: string): Observable<any>{
    return this.http.get(this.baseUrl+"/"+id);
  }

  // To Update Employee By Id
  updateEmp(id: string, employee: Employee): Observable<any>{
    return this.http.put(this.baseUrl+"/"+id, employee);
  }
}



