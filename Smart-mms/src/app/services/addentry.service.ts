import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddentryModel } from '../models/addentry.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddentryService {
private apiUrl = 'http://localhost:3000/addentry';

  constructor(private http: HttpClient) {}
 
  getAllEntry(): Observable<AddentryModel[]> {
    return this.http.get<AddentryModel[]>(this.apiUrl);
  }

  addEntry(addentryModel: AddentryModel): Observable<AddentryModel> {
    return this.http.post<AddentryModel>(this.apiUrl, addentryModel);
  }

  updateEntry(addentryModel: AddentryModel): Observable<AddentryModel> {
    return this.http.put<AddentryModel>(`${this.apiUrl}/${addentryModel.id}`, addentryModel);
  }

  deleteEntry(id: string ): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  
}
  
