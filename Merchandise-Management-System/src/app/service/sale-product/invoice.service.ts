import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { InvoiceModel } from '../../models/products/invoice.model';
import { Observable } from 'rxjs';
import { ProductModel } from '../../models/products/product.model';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  private baseUrl = environment.apiBaseUrl + '/invoice';

  constructor(private http: HttpClient) { }


 getAllInvoice(): Observable<any> {
    return this.http.get(this.baseUrl);

  }

  getInvoiceById(id: number): Observable<any> {
    return this.http.get(this.baseUrl+'/'+id);

  }


   addInvoice(invoice: InvoiceModel): Observable<any> {
      return this.http.post(`${this.baseUrl}/add`, invoice);
    }
   
  
    updateInvoice(invoice: InvoiceModel): Observable<InvoiceModel> {
      return this.http.put<InvoiceModel>(`${this.baseUrl}/${invoice.id}`, invoice);
    }
  
    deleteInvoice(id: number): Observable<void> {
      return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }
  
    updateInventory(productId: number, quantity: number, productModel: ProductModel): Observable<ProductModel> {
    return this.http.put<ProductModel>(`${this.baseUrl}/${productModel.id}`, productModel);
  }
}
