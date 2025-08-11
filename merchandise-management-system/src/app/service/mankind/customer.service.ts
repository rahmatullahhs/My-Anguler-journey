import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CustomerModel } from '../../models/human/customer.model'; // Adjust path as needed
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private baseUrl = environment.apiBaseUrl + '/customer'; // Replace with your actual API base URL

  constructor(private http: HttpClient) {}

  // Get all customers
  getAllCustomers(): Observable<CustomerModel[]> {
    return this.http.get<CustomerModel[]>(this.baseUrl);
  }

  // Get customer by ID
  getCustomerById(id: number): Observable<CustomerModel> {
    return this.http.get<CustomerModel>(`${this.baseUrl}/${id}`);
  }

  // Add new customer
  addCustomer(customer: CustomerModel): Observable<CustomerModel> {
    return this.http.post<CustomerModel>(this.baseUrl, customer);
  }

  // Update customer
  updateCustomer(id: number, customer: CustomerModel): Observable<CustomerModel> {
    return this.http.put<CustomerModel>(`${this.baseUrl}/${id}`, customer);
  }

  // Delete customer
  deleteCustomer(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}

