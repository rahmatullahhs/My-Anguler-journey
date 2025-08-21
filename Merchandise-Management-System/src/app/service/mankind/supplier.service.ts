import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environment/environment';
import { SupplierModel } from '../../models/human/supplier.model';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  private baseUrl = `${environment.apiBaseUrl}/supplier`;

  constructor(private http: HttpClient) {}

  // Get all suppliers
  
  getAllSupplier(): Observable<SupplierModel[]> {
    return this.http.get<SupplierModel[]>(this.baseUrl);
  }

  // Add new supplier
  addSupplier(supplier: SupplierModel): Observable<SupplierModel> {
    return this.http.post<SupplierModel>(`${this.baseUrl}/add`, supplier);
  }

  // Update existing supplier
  updateSupplier(id: number, supplier: SupplierModel): Observable<SupplierModel> {
    return this.http.put<SupplierModel>(`${this.baseUrl}/${id}`, supplier);
  }

  // Delete supplier by ID
  deleteSupplier(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  // Get supplier by ID
  getSupplierById(id: number): Observable<SupplierModel> {
    return this.http.get<SupplierModel>(`${this.baseUrl}/${id}`);
  }
}
