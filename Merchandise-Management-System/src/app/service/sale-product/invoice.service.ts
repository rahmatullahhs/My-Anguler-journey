import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from '../../../environment/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { InvoiceModel } from '../../models/products/invoice.model';
import { Observable } from 'rxjs';
import { ProductModel } from '../../models/products/product.model';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  private baseUrl = environment.apiBaseUrl + '/invoice';

  constructor(private http: HttpClient,
       @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  getAllInvoice(): Observable<any> {
    
    let headers = new HttpHeaders();
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('authToken');
      if (token) {
        headers = headers.set('Authorization', 'Bearer ' + token);
      }
    }
    return this.http.get(`${this.baseUrl}`,{headers});
  }

  getInvoiceById(id: number): Observable<any> {
    
    let headers = new HttpHeaders();
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('authToken');
      if (token) {
        headers = headers.set('Authorization', 'Bearer ' + token);
      }
    }
    return this.http.get(this.baseUrl+'/'+id,{headers});

  }

   addInvoice(invoice: InvoiceModel): Observable<any> {
    
    let headers = new HttpHeaders();
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('authToken');
      if (token) {
        headers = headers.set('Authorization', 'Bearer ' + token);
      }
    }
      return this.http.post(`${this.baseUrl}`, invoice,{headers});
    }
   
  
    updateInvoice(invoice: InvoiceModel): Observable<InvoiceModel> {
      
    let headers = new HttpHeaders();
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('authToken');
      if (token) {
        headers = headers.set('Authorization', 'Bearer ' + token);
      }
    }
      return this.http.put<InvoiceModel>(`${this.baseUrl}/${invoice.id}`, invoice,{headers});
    }
  
    deleteInvoice(id: number): Observable<void> {
      
    let headers = new HttpHeaders();
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('authToken');
      if (token) {
        headers = headers.set('Authorization', 'Bearer ' + token);
      }
    }
      return this.http.delete<void>(`${this.baseUrl}/${id}`,{headers});
    }
  
  getSalesByPeriod(period: string): Observable<any> {
  let headers = new HttpHeaders();
  
  if (isPlatformBrowser(this.platformId)) {
    const token = localStorage.getItem('authToken');
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }
  }

  // Example: GET /invoice/sales?period=Today
  return this.http.get(`${this.baseUrl}/sales?period=${period}`, { headers });
}





getLastMonthExpenses(): Observable<any> {
  return this.http.get<any>('http://localhost:8085/api/expenses/last-month');
}



 getSalesSummary(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/sellsummary`);
  }

 getDueSummary(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/duesummary`);
  }

}
