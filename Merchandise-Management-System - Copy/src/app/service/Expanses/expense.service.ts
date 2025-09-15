import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { ExpenseModel } from '../../models/Accounts/expense.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  
  private baseUrl = `${environment.apiBaseUrl}/expense`;
  constructor(private http: HttpClient) {}
 
  getAllExpense(): Observable<ExpenseModel[]> {
    return this.http.get<ExpenseModel[]>(this.baseUrl);
  }

  addExpense(addentryModel: ExpenseModel): Observable<ExpenseModel> {
    return this.http.post<ExpenseModel>(this.baseUrl, addentryModel);
  }

  updateEntry(addentryModel: ExpenseModel): Observable<ExpenseModel> {
    return this.http.put<ExpenseModel>(`${this.baseUrl}/${addentryModel.id}`, addentryModel);
  }

  deleteExpense(id: number ): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
  
}

