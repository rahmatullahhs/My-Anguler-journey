import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DuelistModel } from '../../models/Accounts/duelist.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class DuelistService {
  
  private baseUrl = environment.apiBaseUrl + '/duelist';

  constructor(private http: HttpClient) { }


  getAllDue(): Observable<DuelistModel[]> {
    return this.http.get<DuelistModel[]>(this.baseUrl);
  }

 addDue(duelist: DuelistModel): Observable<any> {
    return this.http.post(`${this.baseUrl}/add`, duelist);
  }
 

  updateDue(duelist: DuelistModel): Observable<DuelistModel> {
    return this.http.put<DuelistModel>(`${this.baseUrl}/${duelist.id}`, duelist);
  }

  deleteDue(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

}








