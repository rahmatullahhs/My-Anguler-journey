import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environment/environment';
import { ProductPriceModel } from '../../models/Accounts/productprice.model';

@Injectable({
  providedIn: 'root'
})
export class ProductPriceService {

  // The base URL for the API that manages product prices
  private baseUrl = `${environment.apiBaseUrl}/productPrice`;

  constructor(private http: HttpClient) {}

  // Get all product prices
  getProductPrices(): Observable<ProductPriceModel[]> {
    return this.http.get<ProductPriceModel[]>(this.baseUrl)
      .pipe(
        catchError(this.handleError) // Handle any error
      );
  }

  // Get a specific product price by ID
  getProductPriceById(id: number): Observable<ProductPriceModel> {
    return this.http.get<ProductPriceModel>(`${this.baseUrl}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Add a new product price
  addProductPrice(productPrice: ProductPriceModel): Observable<ProductPriceModel> {
    return this.http.post<ProductPriceModel>(this.baseUrl, productPrice)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Update an existing product price
  updateProductPrice(id: number, productPrice: ProductPriceModel): Observable<ProductPriceModel> {
    return this.http.put<ProductPriceModel>(`${this.baseUrl}/${id}`, productPrice)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Delete a product price by ID
  deleteProductPrice(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Error handling method
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Backend error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    return throwError(errorMessage); // Return an observable with an error message
  }
}
