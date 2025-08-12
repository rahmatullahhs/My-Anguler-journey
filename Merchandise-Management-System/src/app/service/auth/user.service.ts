import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { UserModel } from '../../models/profile/user.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
   private baseUrl: string = "http://localhost:3000/user";

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }


  getUserProfile(): Observable<UserModel | null> {
    return of(this.authService.getUserProfileFromStorage());
  }


 updateUserProfile(user: UserModel): Observable<UserModel> {
    localStorage.setItem('userProfile', JSON.stringify(user));
    return this.http.put<UserModel>(`${this.baseUrl}/${user.id}`, user);
  }

  getAllUser(): Observable<any>{
      
          return this.http.get(this.baseUrl);
      
        }
     viewUserProfile(id: string): Observable<any> {
      return this.http.get(this.baseUrl+'/'+id);
    }
   getUserById(id: string): Observable<any> {
  
      return this.http.get(this.baseUrl+'/'+id);
    }
    updateUser(id: string, user: UserModel): Observable<any> {
  
     return this.http.put(this.baseUrl+'/'+id,user);
    }
  
  
}
