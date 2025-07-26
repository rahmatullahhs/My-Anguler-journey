import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CogsModel } from '../models/cogs.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CogsService {
private apiUrl = 'http://localhost:3000/Cogs';

  constructor(private http: HttpClient) {}
 
  getAllCogs(): Observable<CogsModel[]> {
    return this.http.get<CogsModel[]>(this.apiUrl);
  }

  addCogs(cogsModel: CogsModel): Observable<CogsModel> {
    return this.http.post<CogsModel>(this.apiUrl, cogsModel);
  }

  updateCogs(cogsModel: CogsModel): Observable<CogsModel> {
    return this.http.put<CogsModel>(`${this.apiUrl}/${cogsModel.id}`, cogsModel);
  }

  deleteCogs(id: string ): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  
}


