import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CogsModel } from '../../models/Accounts/cogs.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CogsService {
  
  private baseUrl = `${environment.apiBaseUrl}/cogs`;

  constructor(private http: HttpClient) {}
 
  getAllCogs(): Observable<CogsModel[]> {
    return this.http.get<CogsModel[]>(this.baseUrl);
  }

  addCogs(cogsModel: CogsModel): Observable<CogsModel> {
    return this.http.post<CogsModel>(`${this.baseUrl}/add`, cogsModel);
  }

  updateCogs(cogsModel: CogsModel): Observable<CogsModel> {
    return this.http.put<CogsModel>(`${this.baseUrl}/${cogsModel.id}`, cogsModel);
  }

  deleteCogs(id: number ): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
