import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SupplierModel } from '../../models/human/supplier.model';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
 private baseUrl = environment.apiBaseUrl + '/supplier'; // <-- Replace with your actual backend URL

  constructor(private http: HttpClient) {}

  // Get all suppliers
  getAllSupplier(): Observable<SupplierModel[]> {
    return this.http.get<SupplierModel[]>(this.baseUrl);
  }

  // Get a supplier by ID
  getSupplierById(id: number): Observable<SupplierModel> {
    return this.http.get<SupplierModel>(`${this.baseUrl}/${id}`);
  }

  // Create a new supplier
  addSupplier(supplier: SupplierModel): Observable<SupplierModel> {
    return this.http.post<SupplierModel>(this.baseUrl, supplier);
  }

  // Update existing supplier
  updateSupplier(id: number, supplier: SupplierModel): Observable<SupplierModel> {
    return this.http.put<SupplierModel>(`${this.baseUrl}/${id}`, supplier);
  }

  // Delete a supplier
  deleteSupplier(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}

