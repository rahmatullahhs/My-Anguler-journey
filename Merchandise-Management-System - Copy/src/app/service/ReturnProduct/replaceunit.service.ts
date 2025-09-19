 import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from '../../../environment/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReplaceunitModel } from '../../models/ReturnProduct/replaceunit.model';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ReplaceunitService {
  
 
   private baseUrl = `${environment.apiBaseUrl}/replaceUnit`;

  constructor(private http: HttpClient,
     @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  // Get all replaceUnit
  getAllReplaceunit(): Observable<ReplaceunitModel[]> {
    
    let headers = new HttpHeaders();
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('authToken');
      if (token) {
        headers = headers.set('Authorization', 'Bearer ' + token);
      }
    }
    return this.http.get<ReplaceunitModel[]>(this.baseUrl,{headers});
  }

  // Get a replaceUnit by ID
  getReplaceunitById(id: number): Observable<ReplaceunitModel> {
    
    let headers = new HttpHeaders();
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('authToken');
      if (token) {
        headers = headers.set('Authorization', 'Bearer ' + token);
      }
    }
    return this.http.get<ReplaceunitModel>(`${this.baseUrl}/${id}`,{headers});
  }

  // Create a new replaceUnit
  createReplaceunit(replaceUnit: ReplaceunitModel): Observable<ReplaceunitModel> {
    
    let headers = new HttpHeaders();
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('authToken');
      if (token) {
        headers = headers.set('Authorization', 'Bearer ' + token);
      }
    }
    return this.http.post<ReplaceunitModel>(`${this.baseUrl}/add`, replaceUnit,{headers});
  }

  // Update an existing replaceUnit
  updateReplaceunit(id: number, replaceUnit: ReplaceunitModel): Observable<ReplaceunitModel> {
    
    let headers = new HttpHeaders();
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('authToken');
      if (token) {
        headers = headers.set('Authorization', 'Bearer ' + token);
      }
    }
    return this.http.put<ReplaceunitModel>(`${this.baseUrl}/${id}`, replaceUnit,{headers});
  }

  // Delete areplaceUnit by ID
  deleteReplaceunit(id: number): Observable<void> {
    
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



