import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { UserModel } from '../models/user.model';
import { AuthResponse } from '../models/auth-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = "http://localhost:4200/user";

  private currentUserSubject: BehaviorSubject<UserModel | null>;
  public currentUser$: Observable<UserModel | null>;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {

    const storedUser = this.isBrowser() ? JSON.parse(localStorage.getItem('currentUser') || 'null') : null;
    this.currentUserSubject = new BehaviorSubject<UserModel | null>(storedUser);
    this.currentUser$ = this.currentUserSubject.asObservable();

  }

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  register(usermodel: UserModel): Observable<AuthResponse> {
    return this.http.post<UserModel>(this.baseUrl, usermodel).pipe(
      map((newUser: UserModel) => {

        // create token by username and password 
        const token = btoa(`${newUser.email}${newUser.password}`);
        return { token, usermodel: newUser } as AuthResponse;
      }),
      catchError(error => {
        console.error('Registration error:', error);
        throw error;
      })
    );
  }

  login(credentials: { email: string; password: string }): Observable<AuthResponse> {
    let params = new HttpParams().append('email', credentials.email);

    return this.http.get<UserModel[]>(`${this.baseUrl}`, { params }).pipe(
      map(users => {
        if (users.length > 0) {
          const usermodel = users[0];
          if (usermodel.password === credentials.password) {
            const token = btoa(`${usermodel.email}:${usermodel.password}`);
            this.storeToken(token);
            this.setCurrentUser(usermodel);
            return { token, usermodel } as AuthResponse;
          } else {
            throw new Error('Invalid password');
          }
        } else {
          throw new Error('User not found');
        }
      }),
      catchError(error => {
        console.error('Login error:', error);
        throw error;
      })
    );
  }


  storeToken(token: string): void {
    if (this.isBrowser()) {
      localStorage.setItem('token', token);
    }
  }


  private setCurrentUser(usermodel: UserModel): void {
    if (this.isBrowser()) {
      localStorage.setItem('currentUser', JSON.stringify(usermodel));
    }
    this.currentUserSubject.next(usermodel);
  }
// start logout
  logout(): void {
    this.clearCurrentUser();
    if (this.isBrowser()) {
      localStorage.removeItem('token');
    }
  }

  private clearCurrentUser(): void {
    if (this.isBrowser()) {
      localStorage.removeItem('currentUser');
    }
    this.currentUserSubject.next(null);
  }

  removeUserDetails(): void {
    if (this.isBrowser()) {
      localStorage.clear();
    }
  }

  // log out end

  getUserRole(): any {
    return this.currentUserValue?.role;
  }
  
  public get currentUserValue(): UserModel | null {
    return this.currentUserSubject.value;
  }

  getToken(): string | null {
    return this.isBrowser() ? localStorage.getItem('token') : null;
  }


  isAuthenticated(): boolean {
    return !!this.getToken();
  }


   storeUserProfile(usermodel: UserModel): void {
    if (this.isBrowser()) {
      localStorage.setItem('currentUser', JSON.stringify(usermodel));
    }
  }

  getUserProfileFromStorage(): UserModel | null {
    if (this.isBrowser()) {
      const userProfile = localStorage.getItem('currentUser');
      console.log('User Profile is: ', userProfile);
      return userProfile ? JSON.parse(userProfile) : null;
    }
    return null;
  }



}