import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Products {
  baseUrl: string = "http://localhost:3000/products"
  constructor(private http: HttpClient) { }


    getProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }
  

  addProduct(product: any): Observable<any> {
    return this.http.post(this.baseUrl, product);
  }


  updateProduct(id: number, product: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, product);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

}
