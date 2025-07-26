import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AccountspayentryModel } from '../models/accountspayentry.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountpayentryService {
private apiUrl = 'http://localhost:3000/accountpayentry';

  constructor(private http: HttpClient) {}
 
  getAllAccountPayEntry(): Observable<AccountspayentryModel[]> {
    return this.http.get<AccountspayentryModel[]>(this.apiUrl);
  }

  addAccountPayEntry(accountspayentryModel: AccountspayentryModel): Observable<AccountspayentryModel> {
    return this.http.post<AccountspayentryModel>(this.apiUrl, accountspayentryModel);
  }

  updateAccountPayEntry(accountspayentryModel: AccountspayentryModel): Observable<AccountspayentryModel> {
    return this.http.put<AccountspayentryModel>(`${this.apiUrl}/${accountspayentryModel.id}`, accountspayentryModel);
  }

  deleteAccountPayEntry(id: string ): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  
}
  

