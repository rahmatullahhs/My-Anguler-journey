import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeModel } from '../../models/human/employee.model';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  
  private baseUrl = environment.apiBaseUrl + '/employee';

  constructor(private http: HttpClient) {}

  getAllEmp(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  addEmp(employee: EmployeeModel): Observable<any> {
    return this.http.post(`${this.baseUrl}/add`, employee);
  }

  updateEmp(id: number, employee: EmployeeModel): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, employee);
  }

  deleteEmp(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  // To Find Employee By ID
  getEmployeeById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

}
