import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth-service';

import { Observable, of } from 'rxjs';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class Userservice {

    private baseUrl: string = "http://localhost:4200/user";

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }


  getUserProfile(): Observable<UserModel | null> {
    return of(this.authService.getUserProfileFromStorage());
  }


    updateUserProfile(usermodel: UserModel): Observable<UserModel> {
    localStorage.setItem('userProfile', JSON.stringify(usermodel));
    return this.http.put<UserModel>(`${this.baseUrl}/${usermodel.id}`, usermodel);
  }
  





}