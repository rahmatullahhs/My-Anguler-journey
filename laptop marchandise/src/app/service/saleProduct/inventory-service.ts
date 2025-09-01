import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Inventory } from '../../models/products/inventory.mode';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';
import { StockIn } from '../../models/products/stockIn.model';
import { StockOut } from '../../models/products/stockOut.model';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
    private baseUrlInventory = environment.apiBaseUrl + '/inventory';
  

  constructor(private http: HttpClient) {}

  // Get all inventory items
  getInventories(): Observable<Inventory[]> {
    return this.http.get<Inventory[]>(this.baseUrlInventory);
  }

  // Save a new inventory item
  saveInventories(data: Inventory): Observable<Inventory> {
    return this.http.post<Inventory>(this.baseUrlInventory, data);
  }






  //test

   private baseUrl = 'http://localhost:8085/api/inventory';

  

  addStock(stock: Inventory): Observable<string> {
    return this.http.post(`${this.baseUrl}/add`, stock, { responseType: 'text' });
  }

  removeStock(stock: Inventory): Observable<string> {
    return this.http.post(`${this.baseUrl}/remove`, stock, { responseType: 'text' });
  }
}

