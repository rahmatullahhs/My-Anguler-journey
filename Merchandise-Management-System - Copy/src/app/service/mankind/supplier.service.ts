import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environment/environment';
import { SupplierModel } from '../../models/human/supplier.model';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  private baseUrl = `${environment.apiBaseUrl}/supplier`;

  constructor(private http: HttpClient,
        @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  // Get all suppliers
  
  getAllSupplier(): Observable<SupplierModel[]> {
    let headers = new HttpHeaders();
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('authToken');
      if (token) {
        headers = headers.set('Authorization', 'Bearer ' + token);
      }
    }

    return this.http.get<SupplierModel[]>(this.baseUrl,{headers});
  }

  // Add new supplier
  addSupplier(supplier: SupplierModel): Observable<SupplierModel> {
    let headers = new HttpHeaders();
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('authToken');
      if (token) {
        headers = headers.set('Authorization', 'Bearer ' + token);
      }
    }

    return this.http.post<SupplierModel>(`${this.baseUrl}/add`, supplier,{headers});
  }

  // Update existing supplier
  updateSupplier(id: number, supplier: SupplierModel): Observable<SupplierModel> {
   let headers = new HttpHeaders();
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('authToken');
      if (token) {
        headers = headers.set('Authorization', 'Bearer ' + token);
      }
    }

    return this.http.put<SupplierModel>(`${this.baseUrl}/${id}`, supplier,{headers});
  }

  // Delete supplier by ID
  deleteSupplier(id: number): Observable<void> {
    let headers = new HttpHeaders();
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('authToken');
      if (token) {
        headers = headers.set('Authorization', 'Bearer ' + token);
      }
    }

    return this.http.delete<void>(`${this.baseUrl}/${id}`,{headers});
  }

  // Get supplier by ID
  getSupplierById(id: number): Observable<SupplierModel> {
    let headers = new HttpHeaders();
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('authToken');
      if (token) {
        headers = headers.set('Authorization', 'Bearer ' + token);
      }
    }

    return this.http.get<SupplierModel>(`${this.baseUrl}/${id}`,{headers});
  }
}
