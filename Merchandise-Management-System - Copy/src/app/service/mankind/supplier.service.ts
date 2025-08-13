import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environment/environment';
import { SupplierModel } from '../../models/human/supplier.model';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  private baseUrl = environment.apiBaseUrl + '/supplier/';

  constructor(
    private http: HttpClient
  ) { }

  getAllSupplier(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  addSupplier(supplier: SupplierModel): Observable<any> {
    return this.http.post(this.baseUrl + "add", supplier);
  }

  updateSupplier(id: number, supplier: SupplierModel): Observable<any> {
    return this.http.put(this.baseUrl + id, supplier);
  }

  deleteSupplier(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + id);
  }

  getSupplierById(id: number): Observable<any> {
    return this.http.get(this.baseUrl + id);
  }

}
