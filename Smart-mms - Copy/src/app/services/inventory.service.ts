import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InventoryModel } from '../models/inventory.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  private apiUrl = 'http://localhost:3000/inventory';

  constructor(private http: HttpClient) {}

    getAllInventory(): Observable<InventoryModel[]> {
    return this.http.get<InventoryModel[]>(this.apiUrl);
  }

    addInventory(inventoryModel: InventoryModel): Observable<InventoryModel> {
    return this.http.post<InventoryModel>(this.apiUrl, inventoryModel);
  }

  updateInventory(inventoryModel: InventoryModel): Observable<InventoryModel> {
  return this.http.put<InventoryModel>(`${this.apiUrl}/${inventoryModel.id}`, inventoryModel);
}


  deleteInventory(id: string ): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }



  
  
}