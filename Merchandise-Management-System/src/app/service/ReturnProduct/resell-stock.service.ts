import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResellStockModel } from '../../models/ReturnProduct/resellstock.model';

@Injectable({
  providedIn: 'root'
})
export class ResellStockService {

   private baseUrl = `${environment.apiBaseUrl}/resellproduct`;

  constructor(private http: HttpClient) {}

  // Get all resellStock
  getAllResellstock(): Observable<ResellStockModel[]> {
    return this.http.get<ResellStockModel[]>(this.baseUrl);
  }

  // Get a resellStock by ID
  getResellstockById(id: number): Observable<ResellStockModel> {
    return this.http.get<ResellStockModel>(`${this.baseUrl}/${id}`);
  }

  // Create a new resellStock
  createResellstock(resellStock: ResellStockModel): Observable<ResellStockModel> {
    return this.http.post<ResellStockModel>(this.baseUrl, resellStock);
  }

  // Update an existing resellStock
  updateResellstock(id: number, resellStock: ResellStockModel): Observable<ResellStockModel> {
    return this.http.put<ResellStockModel>(`${this.baseUrl}/${id}`, resellStock);
  }

  // Delete a resellStock by ID
  deleteResellstock(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}

