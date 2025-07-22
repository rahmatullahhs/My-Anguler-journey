import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SalestrackingModel } from '../models/saletracking.model';

@Injectable({
  providedIn: 'root'
})
export class SaletrackingService {
  baseUrlSaletrack: string = "http://localhost:3000/salesTracing";

  constructor(private http: HttpClient) { }

  getAllSales(): Observable<any> {
    return this.http.get(this.baseUrlSaletrack);
  }

  getAllOrderById(id: string): Observable<SalestrackingModel> {
    return this.http.get<SalestrackingModel>(this.baseUrlSaletrack + "/" + id);
  }

  saveST(st: SalestrackingModel): Observable<any> {
    return this.http.post(this.baseUrlSaletrack, st);
  }

}
