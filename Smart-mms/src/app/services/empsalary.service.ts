import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee';
import { Empsalary } from '../models/empsalary.model';

@Injectable({
  providedIn: 'root'
})
export class EmpSalaryService {

  baseUrl: string = "http://localhost:3000/empsalary";

  constructor(private http: HttpClient) { }

 // To Get All Employees
  getAllEmpSalary(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  // To Add New Employee
  saveEmpSalary(empsalary: Empsalary): Observable<any> {
    return this.http.post(this.baseUrl, empsalary);
  }

  // To Delete Employee
  deleteEmpSalary(id: string): Observable<any>{
    return this.http.delete(this.baseUrl+"/"+id);
  }

  // To Find Employee By ID
  getEmpSalaryById(id: string): Observable<any>{
    return this.http.get(this.baseUrl+"/"+id);
  }

  // To Update Employee By Id
  updateEmpSalary(id: string, empsalary: Empsalary): Observable<any>{
    return this.http.put(this.baseUrl+"/"+id, empsalary);
  }
}



