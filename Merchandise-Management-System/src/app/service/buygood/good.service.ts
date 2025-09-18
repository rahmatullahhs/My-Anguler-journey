import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';
import { GoodModel } from '../../models/goods/good.model';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})

export class GoodService {
  private baseUrl = environment.apiBaseUrl + '/goods';

  constructor(private http: HttpClient,
        @Inject(PLATFORM_ID) private platformId: Object

  ) {}

  getAllGoods(): Observable<GoodModel[]> {

    return this.http.get<GoodModel[]>(this.baseUrl,{} );
  }

  addGoods(goodModel: GoodModel): Observable<GoodModel> {
     let headers = new HttpHeaders();
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('authToken');
      if (token) {
        headers = headers.set('Authorization', 'Bearer ' + token);
      }
    }

    return this.http.post<GoodModel>(`${this.baseUrl}/add`, goodModel ,{headers});
  }

  updateGoods(goodModel: GoodModel): Observable<GoodModel> {
     let headers = new HttpHeaders();
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('authToken');
      if (token) {
        headers = headers.set('Authorization', 'Bearer ' + token);
      }
    }

    return this.http.put<GoodModel>(`${this.baseUrl}/${goodModel.id}`, goodModel,{headers});
  }

  deleteGoods(id: number): Observable<void> {
     let headers = new HttpHeaders();
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('authToken');
      if (token) {
        headers = headers.set('Authorization', 'Bearer ' + token);
      }
    }

    return this.http.delete<void>(`${this.baseUrl}/${id}`,{headers});
  }

  getGoodsById(id: number): Observable<GoodModel> {
     let headers = new HttpHeaders();
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('authToken');
      if (token) {
        headers = headers.set('Authorization', 'Bearer ' + token);
      }
    }

    return this.http.get<GoodModel>(`${this.baseUrl}/${id}`,{headers});
  }
}
