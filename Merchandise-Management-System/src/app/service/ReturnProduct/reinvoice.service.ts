import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { HttpClient } from '@angular/common/http';
import {  Observable } from 'rxjs';
import { ReinvoiceModel } from '../../models/ReturnProduct/reinvoice.model';
import { ResellStockModel } from '../../models/ReturnProduct/resellstock.model';

@Injectable({
  providedIn: 'root'
})
export class ReinvoiceService {
   private baseUrl = `${environment.apiBaseUrl}/reinvoices`;

  constructor(private http: HttpClient) {}


  getAllReInvoice(): Observable<any> {
    return this.http.get(this.baseUrl);

  }

  saveReInvoice(reinvoiceModel: ReinvoiceModel): Observable<any> {
    return this.http.post(this.baseUrl, reinvoiceModel);

  }

  deleteReInvoice(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + "/" + id);

  }

  getReInvoiceById(id: number): Observable<any> {
    return this.http.get(this.baseUrl+'/'+id);

  }

updateResellstock(resellStock: ResellStockModel): Observable<ResellStockModel> {
  return this.http.put<ResellStockModel>(`${this.baseUrl}/${resellStock.id}`, resellStock);
}

}

