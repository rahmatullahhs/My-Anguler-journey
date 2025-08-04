import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeModel } from '../../models/human/employee.model';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

 private baseUrl = environment.apiBaseUrl + '/employee/';

  constructor(
    private http: HttpClient
  ) { }

  getAllEmp(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  addEmp(employee: EmployeeModel): Observable<any> {
    return this.http.post(this.baseUrl, employee);
  }

  updateEmp(id: string, employee: EmployeeModel): Observable<any> {
    return this.http.put(this.baseUrl + "/" + id, employee);
  }

  deleteEmp(id: string): Observable<any> {
    return this.http.delete(this.baseUrl + "/" + id);
  }







}
