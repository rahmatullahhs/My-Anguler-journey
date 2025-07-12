import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PurchaseModel } from '../models/purchase.model';


@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  private apiUrl = 'http://localhost:3000/purchase';

  constructor(private http: HttpClient) {}

    getAllPurchase(): Observable<PurchaseModel[]> {
    return this.http.get<PurchaseModel[]>(this.apiUrl);
  }

    addPurchase(purchaseModel: PurchaseModel): Observable<PurchaseModel> {
    return this.http.post<PurchaseModel>(this.apiUrl, purchaseModel);
  }

  updatePurchase(purchaseModel: PurchaseModel): Observable<PurchaseModel> {
    return this.http.put<PurchaseModel>(`${this.apiUrl}/${purchaseModel.id}`, purchaseModel);
  }

  deletePurchase(id: string ): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  
}