import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { DuelistModel } from '../../models/Accounts/duelist.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class DuelistService {
  
  private baseUrl = environment.apiBaseUrl + '/duelist';

  constructor(private http: HttpClient,
     @Inject(PLATFORM_ID) private platformId: Object
  ) { }


  getAllDue(): Observable<DuelistModel[]> {
    
    let headers = new HttpHeaders();
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('authToken');
      if (token) {
        headers = headers.set('Authorization', 'Bearer ' + token);
      }
    }
    return this.http.get<DuelistModel[]>(this.baseUrl,{headers});
  }

 addDue(duelist: DuelistModel): Observable<any> {
  
    let headers = new HttpHeaders();
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('authToken');
      if (token) {
        headers = headers.set('Authorization', 'Bearer ' + token);
      }
    }
    return this.http.post(`${this.baseUrl}/add`, duelist,{headers});
  }
 

  updateDue(duelist: DuelistModel): Observable<DuelistModel> {
    
    let headers = new HttpHeaders();
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('authToken');
      if (token) {
        headers = headers.set('Authorization', 'Bearer ' + token);
      }
    }
    return this.http.put<DuelistModel>(`${this.baseUrl}/${duelist.id}`, duelist,{headers});
  }

  deleteDue(id: number): Observable<void> {
    
    let headers = new HttpHeaders();
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('authToken');
      if (token) {
        headers = headers.set('Authorization', 'Bearer ' + token);
      }
    }
    return this.http.delete<void>(`${this.baseUrl}/${id}`,{headers});
  }

}








