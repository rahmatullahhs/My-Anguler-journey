import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductModel } from '../../models/products/product.model';
import { environment } from '../../../environment/environment';
import { isPlatformBrowser } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = environment.apiBaseUrl + '/product';

  constructor(private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }


  getAll(): Observable<ProductModel[]> {
     let headers = new HttpHeaders();
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('authToken');
      if (token) {
        headers = headers.set('Authorization', 'Bearer ' + token);
      }
    }
    return this.http.get<ProductModel[]>(this.baseUrl,{headers});
  }

 addProduct(product: ProductModel): Observable<any> {
   let headers = new HttpHeaders();
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('authToken');
      if (token) {
        headers = headers.set('Authorization', 'Bearer ' + token);
      }
    }
    return this.http.post(`${this.baseUrl}/add`, product,{headers});
  }
 

  updateProduct(product: ProductModel): Observable<ProductModel> {
     let headers = new HttpHeaders();
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('authToken');
      if (token) {
        headers = headers.set('Authorization', 'Bearer ' + token);
      }
    }
    return this.http.put<ProductModel>(`${this.baseUrl}/${product.id}`, product,{headers});
  }

  deleteProduct(id: number): Observable<void> {
     let headers = new HttpHeaders();
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('authToken');
      if (token) {
        headers = headers.set('Authorization', 'Bearer ' + token);
      }
    }
    return this.http.delete<void>(`${this.baseUrl}/${id}`,{headers});
  }

}
