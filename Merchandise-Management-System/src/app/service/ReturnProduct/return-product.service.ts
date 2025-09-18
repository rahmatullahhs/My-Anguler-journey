import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from '../../../environment/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReturnproductModel } from '../../models/ReturnProduct/returnproduct.model';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ReturnProductService {


  private baseUrl = `${environment.apiBaseUrl}/returnproduct`;

  constructor(private http: HttpClient,
     @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  // Get all return products
  getAllReturnProduct(): Observable<ReturnproductModel[]> {
    
    let headers = new HttpHeaders();
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('authToken');
      if (token) {
        headers = headers.set('Authorization', 'Bearer ' + token);
      }
    }
    return this.http.get<ReturnproductModel[]>(this.baseUrl,{headers});
  }

  // Get a return product by ID
  getReturnProductById(id: number): Observable<ReturnproductModel> {
    
    let headers = new HttpHeaders();
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('authToken');
      if (token) {
        headers = headers.set('Authorization', 'Bearer ' + token);
      }
    }
    return this.http.get<ReturnproductModel>(`${this.baseUrl}/${id}`,{headers});
  }

  // Create a new return product with optional photo upload
  createReturnProduct(returnProduct: ReturnproductModel, photo?: File): Observable<any> {
    
    let headers = new HttpHeaders();
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('authToken');
      if (token) {
        headers = headers.set('Authorization', 'Bearer ' + token);
      }
    }
    const formData = new FormData();

    // Attach JSON object as a string
    formData.append('returnProduct', JSON.stringify(returnProduct));

    // Attach photo file if it exists
    if (photo) {
      formData.append('photo', photo);
    }

    return this.http.post(this.baseUrl, formData,{headers});
  }

  // Update an existing return product
  updateReturnProduct(id: number, returnProduct: ReturnproductModel): Observable<ReturnproductModel> {
    
    let headers = new HttpHeaders();
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('authToken');
      if (token) {
        headers = headers.set('Authorization', 'Bearer ' + token);
      }
    }
    return this.http.put<ReturnproductModel>(`${this.baseUrl}/${id}`, returnProduct,{headers});
  }

  // Delete a return product by ID
  deleteReturnProduct(id: number): Observable<void> {
    
    let headers = new HttpHeaders();
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('authToken');
      if (token) {
        headers = headers.set('Authorization', 'Bearer ' + token);
      }
    }
    return this.http.delete<void>(`${this.baseUrl}/${id}`,{headers});
  }


// return-product.service.ts
markProductAsFixed(id: number): Observable<ReturnproductModel> {
  let headers = new HttpHeaders();
  if (isPlatformBrowser(this.platformId)) {
    const token = localStorage.getItem('authToken');
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }
  }

  return this.http.post<ReturnproductModel>(`${this.baseUrl}/markFixed/${id}`, {}, { headers });
}



}

