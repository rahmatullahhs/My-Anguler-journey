import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from '../../models/products/item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private baseUrl = environment.apiBaseUrl + '/item';
  constructor(private http: HttpClient) { }

  getAllItem(): Observable<any>{
      
  return this.http.get(this.baseUrl);
      
        }
      
  saveItem(item: Item) : Observable<any> {
        
  return this.http.post(this.baseUrl,item);
  }
  
}
