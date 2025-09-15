import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReplaceunitModel } from '../../models/ReturnProduct/replaceunit.model';

@Injectable({
  providedIn: 'root'
})
export class ReplaceunitService {
  
 
   private baseUrl = `${environment.apiBaseUrl}/replaceUnit`;

  constructor(private http: HttpClient) {}

  // Get all replaceUnit
  getAllReplaceunit(): Observable<ReplaceunitModel[]> {
    return this.http.get<ReplaceunitModel[]>(this.baseUrl);
  }

  // Get a replaceUnit by ID
  getReplaceunitById(id: number): Observable<ReplaceunitModel> {
    return this.http.get<ReplaceunitModel>(`${this.baseUrl}/${id}`);
  }

  // Create a new replaceUnit
  createReplaceunit(replaceUnit: ReplaceunitModel): Observable<ReplaceunitModel> {
    return this.http.post<ReplaceunitModel>(`${this.baseUrl}/add`, replaceUnit);
  }

  // Update an existing replaceUnit
  updateReplaceunit(id: number, replaceUnit: ReplaceunitModel): Observable<ReplaceunitModel> {
    return this.http.put<ReplaceunitModel>(`${this.baseUrl}/${id}`, replaceUnit);
  }

  // Delete areplaceUnit by ID
  deleteReplaceunit(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}



