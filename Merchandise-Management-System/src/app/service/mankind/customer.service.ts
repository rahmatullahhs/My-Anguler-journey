import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from '../../../environment/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CustomerModel } from '../../models/human/customer.model';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  

  private baseUrl = environment.apiBaseUrl + '/customer';

  constructor(private http: HttpClient,
     @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  // Get all customers
getAllCustomer(): Observable<any> {
    let headers = new HttpHeaders();
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('authToken');
      if (token) {
        headers = headers.set('Authorization', 'Bearer ' + token);
      }
    }

  return this.http.get(`${this.baseUrl}`,{headers});
}


  // Add a new customer
  addCustomer(customer: CustomerModel): Observable<any> {
    let headers = new HttpHeaders();
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('authToken');
      if (token) {
        headers = headers.set('Authorization', 'Bearer ' + token);
      }
    }
    return this.http.post(this.baseUrl+"/add", customer,{headers});
  }

  // Update a customer
  updateCustomer(id: number, customer: CustomerModel): Observable<any> {
    let headers = new HttpHeaders();
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('authToken');
      if (token) {
        headers = headers.set('Authorization', 'Bearer ' + token);
      }
    }
    return this.http.put(`${this.baseUrl}/${id}`, customer,{headers});
  }

  // Delete a customer
  deleteCustomer(id: number): Observable<any> {
    let headers = new HttpHeaders();
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('authToken');
      if (token) {
        headers = headers.set('Authorization', 'Bearer ' + token);
      }
    }
    return this.http.delete(`${this.baseUrl}/${id}`,{headers});
  }

  // Get a customer by ID
  getCustomerById(id: number): Observable<any> {
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


