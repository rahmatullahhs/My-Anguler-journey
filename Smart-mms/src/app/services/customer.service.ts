import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomerModel } from '../models/customer.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {
baseUrl: string = "http://localhost:3000/customer";
  constructor(private http: HttpClient) { }
}


 // To Get All customer
  getAllCustomer(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  // To Add New customer
  saveCustomer(CustomerModel : CustomerModel): Observable<any> {
    return this.http.post(this.baseUrl, employee);
  }

  // To Delete customer
  deleteCustomer(id: string): Observable<any>{
    return this.http.delete(this.baseUrl+"/"+id);
  }

  // To Find customer By ID
  getById(id: string): Observable<any>{
    return this.http.get(this.baseUrl+"/"+id);
  }

  // To Update customer By Id
  updateCustomer(id: string, CustomerModel: CustomerModel): Observable<any>{
    return this.http.put(this.baseUrl+"/"+id, CustomerModel);
  }




