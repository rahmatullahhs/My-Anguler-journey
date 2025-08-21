import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';
import { GoodModel } from '../../models/goods/good.model';

@Injectable({
  providedIn: 'root'
})

export class GoodService {
  private baseUrl = environment.apiBaseUrl + '/goods';

  constructor(private http: HttpClient) {}

  getAllGoods(): Observable<GoodModel[]> {
    return this.http.get<GoodModel[]>(this.baseUrl);
  }

  addGoods(goodModel: GoodModel): Observable<GoodModel> {
    return this.http.post<GoodModel>(`${this.baseUrl}/add`, goodModel);
  }

  updateGoods(goodModel: GoodModel): Observable<GoodModel> {
    return this.http.put<GoodModel>(`${this.baseUrl}/${goodModel.id}`, goodModel);
  }

  deleteGoods(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getGoodsById(id: string): Observable<GoodModel> {
    return this.http.get<GoodModel>(`${this.baseUrl}/${id}`);
  }
}
