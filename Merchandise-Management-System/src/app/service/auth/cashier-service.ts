import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from '../../../environment/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RoleCashier } from '../../models/profile/cashier.model';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CashierService {
  
   
  private baseUrl = environment.apiBaseUrl + '/cashier';

  
    constructor(
      private http: HttpClient,
      @Inject(PLATFORM_ID) private platformId: Object
    ) { }

  registerCashier(user: any, cashier: any, photo: File): Observable<any> {
    const formData = new FormData();
    formData.append('user', JSON.stringify(user));
    formData.append('cashier', JSON.stringify(cashier));
    formData.append('photo', photo);

    return this.http.post(this.baseUrl+"/reg", formData);
  }

  getProfile(): Observable<RoleCashier> {
    let headers = new HttpHeaders();

    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('authToken');
      if (token) {
        headers = headers.set('Authorization', 'Bearer ' + token);
        console.log(headers);
      }
    }

    return this.http.get<RoleCashier>(`${environment.apiBaseUrl}/cashier/profile`, { headers });
  }
}
