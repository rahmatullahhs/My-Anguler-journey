import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { CogsModel } from '../../models/Accounts/cogs.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CogsService {
   
  private baseUrl = `${environment.apiBaseUrl}/cogs`;

  constructor(private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}
 
  getAllCogs(): Observable<CogsModel[]> {
 let headers = new HttpHeaders();

    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('authToken');
      if (token) {
        headers = headers.set('Authorization', 'Bearer ' + token);
      }
    }
    return this.http.get<CogsModel[]>(this.baseUrl,{headers});
  }

  addCogs(cogsModel: CogsModel): Observable<CogsModel> {
let headers = new HttpHeaders();

    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('authToken');
      if (token) {
        headers = headers.set('Authorization', 'Bearer ' + token);
      }
    }

    return this.http.post<CogsModel>(`${this.baseUrl}/add`, cogsModel ,{headers});
  }

  updateCogs(cogsModel: CogsModel): Observable<CogsModel> {
    let headers = new HttpHeaders();

    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('authToken');
      if (token) {
        headers = headers.set('Authorization', 'Bearer ' + token);
      }
    }
    return this.http.put<CogsModel>(`${this.baseUrl}/${cogsModel.id}`, cogsModel,{headers});
  }

  deleteCogs(id: number ): Observable<void> {
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