import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SellHisModel } from '../models/sell-his.model';

@Injectable({
  providedIn: 'root'
})
export class SellhisService {
  baseUrlSaletrack: string = "http://localhost:3000/sellHis";

  constructor(private http: HttpClient) { }

  getAllSellHis(): Observable<any> {
    return this.http.get(this.baseUrlSaletrack);
  }

  getAllSellHisById(id: string): Observable<SellHisModel> {
    return this.http.get<SellHisModel>(this.baseUrlSaletrack + "/" + id);
  }

  saveSellHis(st: SellHisModel): Observable<any> {
    return this.http.post(this.baseUrlSaletrack, st);
  }

}
