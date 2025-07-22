import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SaletrackingService {
baseUrlSelsTrac: string = "http://localhost:3000/sellsTracing";

  constructor(private http: HttpClient) { }

  getAllSells(): Observable<any> {
    return this.http.get(this.baseUrlSelsTrac);
  }

}
