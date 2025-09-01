import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExpensefieldModel } from '../../models/Accounts/expensefield.model';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ExpensefieldService {
 
  private baseUrl = `${environment.apiBaseUrl}/expanse`;
  constructor(private http: HttpClient) {}
 
  getAllField(): Observable<ExpensefieldModel[]> {
    return this.http.get<ExpensefieldModel[]>(this.baseUrl);
  }

  addfield(addentryModel: ExpensefieldModel): Observable<ExpensefieldModel> {
    return this.http.post<ExpensefieldModel>(this.baseUrl, addentryModel);
  }

  updateEntry(addentryModel: ExpensefieldModel): Observable<ExpensefieldModel> {
    return this.http.put<ExpensefieldModel>(`${this.baseUrl}/${addentryModel.id}`, addentryModel);
  }

  deleteEntry(id: number ): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
  
}
  

