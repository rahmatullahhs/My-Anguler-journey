import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  
// employee.service.ts
addEmployee(employeeFormData: FormData): Observable<any> {
  return this.http.post('http://localhost:8085/api/employee/add', employeeFormData);
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
