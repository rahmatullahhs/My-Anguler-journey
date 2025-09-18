import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from '../../../environment/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RoleManager } from '../../models/profile/manager.model';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {
  
  
  
  private baseUrl = environment.apiBaseUrl + '/manager';

  
    constructor(
      private http: HttpClient,
      @Inject(PLATFORM_ID) private platformId: Object
    ) { }

  registerAdmin(user: any, manager: any, photo: File): Observable<any> {
    const formData = new FormData();
    formData.append('user', JSON.stringify(user));
    formData.append('manager', JSON.stringify(manager));
    formData.append('photo', photo);

    return this.http.post(this.baseUrl+"/reg", formData);
  }

  getProfile(): Observable<RoleManager> {
    let headers = new HttpHeaders();

    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('authToken');
      if (token) {
        headers = headers.set('Authorization', 'Bearer ' + token);
        console.log(headers);
      }
    }

    return this.http.get<RoleManager>(`${environment.apiBaseUrl}/manager/profile`, { headers });
  }
}
