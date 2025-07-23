import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PurchaseHisModel } from '../models/purchase-his.model';

@Injectable({
  providedIn: 'root'
})
export class PurchasehisService {
    baseUrlSaletrack: string = "http://localhost:3000/Purchasehis";

  constructor(private http: HttpClient) { }

  getAllPurchaseHis(): Observable<any> {
    return this.http.get(this.baseUrlSaletrack);
  }

  getAllPurchaseHisById(id: string): Observable<PurchaseHisModel> {
    return this.http.get<PurchaseHisModel>(this.baseUrlSaletrack + "/" + id);
  }

  savePurchaseHis(st: PurchaseHisModel): Observable<any> {
    return this.http.post(this.baseUrlSaletrack, st);
  }

}
