import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

import { BehaviorSubject, catchError, map, Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { AuthResponse } from '../../models/profile/auth-response.model';
import { User } from '../../models/profile/user.model';
import { Router } from '@angular/router';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environment.apiBaseUrl + '/auth';

  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  private userRoleSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  public userRole$: Observable<string | null> = this.userRoleSubject.asObservable();



private currentUserSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
public currentUser$: Observable<User | null> = this.currentUserSubject.asObservable();


  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }


  registration(user: User): Observable<AuthResponse> {
    return this.http.post<User>(this.baseUrl, user).pipe(
      map((newUser: User) => {

        // create token by username and password 
        const token = btoa(`${newUser.email}${newUser.password}`);
        return { token, user: newUser } as AuthResponse;
      }),
      catchError(error => {
        console.error('Registration error:', error);
        throw error;
      })
    );
  }



  // login(email: string, password: string): Observable<AuthResponse> {

  //   return this.http.post<AuthResponse>(this.baseUrl + '/login', { email, password }, { headers: this.headers }).pipe(

  //     map(
  //       (response: AuthResponse) => {
  //         if (this.isBrowser() && response.token) {
  //           localStorage.setItem('authToken', response.token);
  //           const decodeToken = this.decodeToken(response.token);
  //           localStorage.setItem('userRole', decodeToken.role);
  //           this.userRoleSubject.next(decodeToken.role);
  //         }
  //         return response;

  //       }

  //     )
  //   );
  // }
login(email: string, password: string): Observable<AuthResponse> {
  return this.http.post<AuthResponse>(this.baseUrl + '/login', { email, password }, { headers: this.headers }).pipe(
    map((response: AuthResponse) => {
      if (this.isBrowser() && response.token) {
        localStorage.setItem('authToken', response.token);

        const decodeToken = this.decodeToken(response.token);
        localStorage.setItem('userRole', decodeToken.role);
        this.userRoleSubject.next(decodeToken.role);

        // Store user info in localStorage
        if (response.user) {
          localStorage.setItem('currentUser', JSON.stringify(response.user));
          this.currentUserSubject.next(response.user);
        }
      }
      return response;
    })
  );
}

   isAuthenticated(): boolean {
    return !!this.getToken();
  }

  
  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }


  decodeToken(token: string) {

    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));

  }

  getToken(): string | null {

    if (this.isBrowser()) {
      return localStorage.getItem('authToken');
    }
    return null;

  }


  getUserRole(): string | null {

    if (this.isBrowser()) {
      return localStorage.getItem('userRole');
    }
    return null;

  }

  isTokenExpired(token: string): boolean {
    const docodeToken = this.decodeToken(token);

    const expiry = docodeToken.exp * 1000;
    return Date.now() > expiry;
  }

  isLoggIn(): boolean {
    const token = this.getToken();
    if (token && !this.isTokenExpired(token)) {
      return true;
    }
    this.logout();
    return false;

  }


  // logout(): void {
  //   if (this.isBrowser()) {
  //     localStorage.removeItem('userRole');
  //     localStorage.removeItem('authToken');
  //     this.userRoleSubject.next(null);
  //   }
  //   this.router.navigate(['/login']);
  // }
logout(): void {
  if (this.isBrowser()) {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    localStorage.removeItem('currentUser');
    this.userRoleSubject.next(null);
    this.currentUserSubject.next(null);
  }
  this.router.navigate(['/login']);
}

  hasRole(roles: string[]): boolean {

    const userRole = this.getUserRole();
    return userRole ? roles.includes(userRole) : false;

  }

 
  isAdmin(): boolean {
    return this.getUserRole() === 'ADMIN';
  }

  isUser(): boolean {
    const role = this.getUserRole();
    return role === 'user';
  }
  isManager(): boolean {
    const role = this.getUserRole();
    return role === 'manager';
  }

  isCashier(): boolean {
    const role = this.getUserRole();
    return role === 'cashier';
  }
  
// <--new method-->
getCurrentUser(): User | null {
  if (this.isBrowser()) {
    const userJson = localStorage.getItem('currentUser');
    return userJson ? JSON.parse(userJson) : null;
  }
  return null;
}
setCurrentUser(user: User): void {
  if (this.isBrowser()) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }
}





}
