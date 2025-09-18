import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from '../../../environment/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  Observable } from 'rxjs';
import { ReinvoiceModel } from '../../models/ReturnProduct/reinvoice.model';
import { ResellStockModel } from '../../models/ReturnProduct/resellstock.model';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ReinvoiceService {
   private baseUrl = `${environment.apiBaseUrl}/reinvoices`;

  constructor(private http: HttpClient,
     @Inject(PLATFORM_ID) private platformId: Object
  ) {}


  getAllReInvoice(): Observable<any> {
     let headers = new HttpHeaders();
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('authToken');
      if (token) {
        headers = headers.set('Authorization', 'Bearer ' + token);
      }
    }
    return this.http.get(this.baseUrl,{headers});

  }

  saveReInvoice(reinvoiceModel: ReinvoiceModel): Observable<any> {
     let headers = new HttpHeaders();
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('authToken');
      if (token) {
        headers = headers.set('Authorization', 'Bearer ' + token);
      }
    }
    return this.http.post(this.baseUrl+"/add", reinvoiceModel,{headers});

  }

  deleteReInvoice(id: number): Observable<any> {
     let headers = new HttpHeaders();
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('authToken');
      if (token) {
        headers = headers.set('Authorization', 'Bearer ' + token);
      }
    }
    return this.http.delete(this.baseUrl + "/" + id,{headers});

  }

  getReInvoiceById(id: number): Observable<any> {
     let headers = new HttpHeaders();
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('authToken');
      if (token) {
        headers = headers.set('Authorization', 'Bearer ' + token);
      }
    }
    return this.http.get(this.baseUrl+'/'+id,{headers});

  }

updateResellstock(resellStock: ResellStockModel): Observable<ResellStockModel> {
   let headers = new HttpHeaders();
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('authToken');
      if (token) {
        headers = headers.set('Authorization', 'Bearer ' + token);
      }
    }
  return this.http.put<ResellStockModel>(`${this.baseUrl}/${resellStock.id}`, resellStock,{headers});
}

}

