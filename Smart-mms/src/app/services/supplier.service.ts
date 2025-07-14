import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SupplierModel } from '../models/supplier.model';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  baseUrl: string = "http://localhost:3000/supplier";
   constructor(private http: HttpClient) { }
  

// To Get All Supplier
  getAllSupplier(): Observable<SupplierModel[]> {
    return this.http.get<SupplierModel[]>(this.baseUrl);
  }

  
  // To Add New Employee
  saveSupplier(supplier: SupplierModel): Observable<any> {
    return this.http.post(this.baseUrl,supplier);
  }

  // To Delete supplier
  deleteSupplier(id: string): Observable<any>{
    return this.http.delete(this.baseUrl+"/"+id);
  }

  // To Find supplier By ID
  getSupplierById(id: string): Observable<any>{
    return this.http.get(this.baseUrl+"/"+id);
  }

  // To Update supplier By Id
  updateSupplier(id: string, supplier: SupplierModel): Observable<any>{
    return this.http.put(this.baseUrl+"/"+id, supplier);
  }
}





