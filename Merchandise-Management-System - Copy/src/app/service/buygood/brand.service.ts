import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BrandModel } from '../../models/goods/brand.model';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  private baseUrl = `${environment.apiBaseUrl}/brand`;

  constructor(private http: HttpClient) {}

  // Get all brands
  getAllBrand(): Observable<BrandModel[]> {
    return this.http.get<BrandModel[]>(this.baseUrl);
  }

  // Add a new brand
  addBrand(brandModel: BrandModel): Observable<BrandModel> {
    return this.http.post<BrandModel>(`${this.baseUrl}/add`, brandModel);
  }

  // Update existing brand
  updateBrand(brandModel: BrandModel): Observable<BrandModel> {
    return this.http.put<BrandModel>(`${this.baseUrl}/${brandModel.id}`, brandModel);
  }

  // Delete brand by id
  deleteBrand(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  // Optional: Get brand by id (if needed)
  getBrandById(id: number): Observable<BrandModel> {
    return this.http.get<BrandModel>(`${this.baseUrl}/${id}`);
  }
}
