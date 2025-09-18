import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { BrandModel } from '../../models/goods/brand.model';
import { environment } from '../../../environment/environment';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  private baseUrl = `${environment.apiBaseUrl}/brand`;

  constructor(private http: HttpClient,
    
    @Inject(PLATFORM_ID) private platformId: Object

  ) {}

  // Get all brands
  getAllBrand(): Observable<BrandModel[]> {

    let headers = new HttpHeaders();
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('authToken');
      if (token) {
        headers = headers.set('Authorization', 'Bearer ' + token);
      }
    }
    
    return this.http.get<BrandModel[]>(this.baseUrl,{headers});
  }

  // Add a new brand
  addBrand(brandModel: BrandModel): Observable<BrandModel> {
    let headers = new HttpHeaders();
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('authToken');
      if (token) {
        headers = headers.set('Authorization', 'Bearer ' + token);
      }
    }
    return this.http.post<BrandModel>(`${this.baseUrl}/add`, brandModel);
  }

  // Update existing brand
  updateBrand(brandModel: BrandModel): Observable<BrandModel> {
    let headers = new HttpHeaders();
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('authToken');
      if (token) {
        headers = headers.set('Authorization', 'Bearer ' + token);
      }
    }
    return this.http.put<BrandModel>(`${this.baseUrl}/${brandModel.id}`, brandModel,{headers});
  }

  // Delete brand by id
  deleteBrand(id: number): Observable<void> {
    let headers = new HttpHeaders();
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('authToken');
      if (token) {
        headers = headers.set('Authorization', 'Bearer ' + token);
      }
    }
    return this.http.delete<void>(`${this.baseUrl}/${id}`,{headers});
  }

  // Optional: Get brand by id (if needed)
  getBrandById(id: number): Observable<BrandModel> {
    let headers = new HttpHeaders();
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('authToken');
      if (token) {
        headers = headers.set('Authorization', 'Bearer ' + token);
      }
    }
    return this.http.get<BrandModel>(`${this.baseUrl}/${id}`,{headers});
  }
}
