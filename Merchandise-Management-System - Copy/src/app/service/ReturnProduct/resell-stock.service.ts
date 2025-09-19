import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from '../../../environment/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResellStockModel } from '../../models/ReturnProduct/resellstock.model';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ResellStockService {

  private baseUrl = `${environment.apiBaseUrl}/resellproduct`;

  constructor(private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object

  ) { }

  // Get all resellStock
  getAllResellstock(): Observable<ResellStockModel[]> {
    let headers = new HttpHeaders();
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('authToken');
      if (token) {
        headers = headers.set('Authorization', 'Bearer ' + token);
      }
    }

    return this.http.get<ResellStockModel[]>(this.baseUrl, { headers });
  }

  // Get a resellStock by ID
  getResellstockById(id: number): Observable<ResellStockModel> {
    let headers = new HttpHeaders();
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('authToken');
      if (token) {
        headers = headers.set('Authorization', 'Bearer ' + token);
      }
    }
    return this.http.get<ResellStockModel>(`${this.baseUrl}/${id}`, { headers });
  }

  // Create a new resellStock
  createResellstock(resellStock: ResellStockModel): Observable<ResellStockModel> {
    let headers = new HttpHeaders();
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('authToken');
      if (token) {
        headers = headers.set('Authorization', 'Bearer ' + token);
      }
    }
    return this.http.post<ResellStockModel>(`${this.baseUrl}/add`, resellStock, { headers });

  }

  // Update an existing resellStock
  updateResellstock(id: number, resellStock: ResellStockModel): Observable<ResellStockModel> {
    let headers = new HttpHeaders();
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('authToken');
      if (token) {
        headers = headers.set('Authorization', 'Bearer ' + token);
      }
    }
    return this.http.put<ResellStockModel>(`${this.baseUrl}/${id}`, resellStock, { headers });
  }

  // Delete a resellStock by ID
  deleteResellstock(id: number): Observable<void> {
    let headers = new HttpHeaders();
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('authToken');
      if (token) {
        headers = headers.set('Authorization', 'Bearer ' + token);
      }
    }
    return this.http.delete<void>(`${this.baseUrl}/${id}`, { headers });
  }
}

