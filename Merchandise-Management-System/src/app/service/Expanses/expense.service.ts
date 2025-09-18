import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from '../../../environment/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ExpenseModel } from '../../models/Accounts/expense.model';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  
  private baseUrl = `${environment.apiBaseUrl}/expense`;

   constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }
 
  getAllExpense(): Observable<ExpenseModel[]> {
    let headers = new HttpHeaders();

    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('authToken');
      if (token) {
        headers = headers.set('Authorization', 'Bearer ' + token);
      }
    }
    return this.http.get<ExpenseModel[]>(this.baseUrl ,{headers});
  }

  addExpense(addentryModel: ExpenseModel): Observable<ExpenseModel> {
     let headers = new HttpHeaders();

    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('authToken');
      if (token) {
        headers = headers.set('Authorization', 'Bearer ' + token);
      }
    }
    return this.http.post<ExpenseModel>(this.baseUrl, addentryModel, {headers});
  }

  updateEntry(addentryModel: ExpenseModel): Observable<ExpenseModel> {
     let headers = new HttpHeaders();

    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('authToken');
      if (token) {
        headers = headers.set('Authorization', 'Bearer ' + token);
      }
    }
    return this.http.put<ExpenseModel>(`${this.baseUrl}/${addentryModel.id}`, addentryModel ,{headers});
  }

  deleteExpense(id: number ): Observable<void> {
     let headers = new HttpHeaders();

    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('authToken');
      if (token) {
        headers = headers.set('Authorization', 'Bearer ' + token);
      }
    }
    return this.http.delete<void>(`${this.baseUrl}/${id}`, {headers});
  }
  
}

