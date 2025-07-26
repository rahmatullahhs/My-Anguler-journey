import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BrandModel } from '../models/brand.model';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
private apiUrl = 'http://localhost:3000/brands';

  constructor(private http: HttpClient) { }

getAllBrand(): Observable<BrandModel[]> {
    return this.http.get<BrandModel[]>(this.apiUrl);
  }

  addBrand(brandModel: BrandModel): Observable<BrandModel> {
    return this.http.post<BrandModel>(this.apiUrl, brandModel);
  }

  updateBrand(brandModel: BrandModel): Observable<BrandModel> {
    return this.http.put<BrandModel>(`${this.apiUrl}/${brandModel.id}`, brandModel);
  }

  deleteBrand(id: string ): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  
}
















