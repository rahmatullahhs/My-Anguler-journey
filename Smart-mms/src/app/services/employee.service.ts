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


  getAllEmp(): Observable<any> {

    return this.http.get(this.baseUrl);

  }

  saveEmp(employee: Employee): Observable<any> {

    return this.http.post(this.baseUrl, employee);


  }




}
