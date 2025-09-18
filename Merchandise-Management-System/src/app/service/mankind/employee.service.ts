import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeModel } from '../../models/human/employee.model';
import { environment } from '../../../environment/environment';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  
  private baseUrl = environment.apiBaseUrl + '/employee';

  constructor(private http: HttpClient,
        @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  getAllEmp(): Observable<any> {
    let headers = new HttpHeaders();
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('authToken');
      if (token) {
        headers = headers.set('Authorization', 'Bearer ' + token);
      }
    }
    return this.http.get(`${this.baseUrl,{headers}}`);
  }

  
// employee.service.ts
addEmployee(employeeFormData: FormData): Observable<any> {
  let headers = new HttpHeaders();
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('authToken');
      if (token) {
        headers = headers.set('Authorization', 'Bearer ' + token);
      }
    }
  return this.http.post('http://localhost:8085/api/employee/add', employeeFormData,{headers});
}



  updateEmp(id: number, employee: EmployeeModel): Observable<any> {
    let headers = new HttpHeaders();
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('authToken');
      if (token) {
        headers = headers.set('Authorization', 'Bearer ' + token);
      }
    }
    return this.http.put(`${this.baseUrl}/${id}`, employee,{headers});
  }

  deleteEmp(id: number): Observable<any> {
    let headers = new HttpHeaders();
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('authToken');
      if (token) {
        headers = headers.set('Authorization', 'Bearer ' + token);
      }
    }
    return this.http.delete(`${this.baseUrl}/${id}`,{headers});
  }

  // To Find Employee By ID
  getEmployeeById(id: number): Observable<any> {
    let headers = new HttpHeaders();
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('authToken');
      if (token) {
        headers = headers.set('Authorization', 'Bearer ' + token);
      }
    }
    return this.http.get(`${this.baseUrl}/${id}`,{headers});
  }

}
