import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BrandModel } from '../../models/goods/brand.model';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  private baseUrl = environment.apiBaseUrl + '/brand';
 
   constructor(private http: HttpClient) {}

getAllBrand(): Observable<BrandModel[]> {
    return this.http.get<BrandModel[]>(this.baseUrl);
  }

  addBrand(brandModel: BrandModel): Observable<BrandModel> {
    return this.http.post<BrandModel>(this.baseUrl+'add', brandModel);
  }

  updateBrand(brandModel: BrandModel): Observable<BrandModel> {
    return this.http.put<BrandModel>(`${this.baseUrl}/${brandModel.id}`, brandModel);
  }

  deleteBrand(id: string ): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}${id}`);
  }
  getBrandById(id: string): Observable<any>{
    return this.http.get(this.baseUrl+"/"+id);
  }

  
}
