import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReturnproductModel } from '../../models/ReturnProduct/returnproduct.model';

@Injectable({
  providedIn: 'root'
})
export class ReturnProductService {


  private baseUrl = `${environment.apiBaseUrl}/returnproduct`;

  constructor(private http: HttpClient) { }

  // Get all return products
  getAllReturnProduct(): Observable<ReturnproductModel[]> {
    return this.http.get<ReturnproductModel[]>(this.baseUrl);
  }

  // Get a return product by ID
  getReturnProductById(id: number): Observable<ReturnproductModel> {
    return this.http.get<ReturnproductModel>(`${this.baseUrl}/${id}`);
  }

  // Create a new return product with optional photo upload
  createReturnProduct(returnProduct: ReturnproductModel, photo?: File): Observable<any> {
    const formData = new FormData();

    // Attach JSON object as a string
    formData.append('returnProduct', JSON.stringify(returnProduct));

    // Attach photo file if it exists
    if (photo) {
      formData.append('photo', photo);
    }

    return this.http.post(this.baseUrl, formData);
  }

  // Update an existing return product
  updateReturnProduct(id: number, returnProduct: ReturnproductModel): Observable<ReturnproductModel> {
    return this.http.put<ReturnproductModel>(`${this.baseUrl}/${id}`, returnProduct);
  }

  // Delete a return product by ID
  deleteReturnProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }


markProductAsFixed(id: number) {
  return this.http.put(`/api/return-products/${id}/mark-fixed`, {});
}


}

