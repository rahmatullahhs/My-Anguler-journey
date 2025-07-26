import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LedgerbookModel } from '../models/ledgerbook.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LedgerbookService {
private apiUrl = 'http://localhost:3000/ledgerbook'; // replace with your real API URL



  constructor(private http: HttpClient) {}

  getAll(): Observable<LedgerbookModel[]> {
    return this.http.get<LedgerbookModel[]>(this.apiUrl);
  }

  add(entry: LedgerbookModel): Observable<LedgerbookModel> {
    return this.http.post<LedgerbookModel>(this.apiUrl, entry);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  update(entry: LedgerbookModel): Observable<LedgerbookModel> {
    return this.http.put<LedgerbookModel>(`${this.apiUrl}/${entry.id}`, entry);
  }
}

