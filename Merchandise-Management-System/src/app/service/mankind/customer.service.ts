import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CustomerModel } from '../../models/human/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  

  private baseUrl = environment.apiBaseUrl + '/customer';

  constructor(private http: HttpClient) {}

  // Get all customers
getAllCustomer(): Observable<any> {
  return this.http.get(`${this.baseUrl}`);
}


  // Add a new customer
  addCustomer(customer: CustomerModel): Observable<any> {
    return this.http.post(this.baseUrl+"/add", customer);
  }

  // Update a customer
  updateCustomer(id: number, customer: CustomerModel): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, customer);
  }

  // Delete a customer
  deleteCustomer(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  // Get a customer by ID
  getCustomerById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
}


