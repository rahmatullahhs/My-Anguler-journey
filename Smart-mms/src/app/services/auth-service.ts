import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
private baseUrl: string = "http://localhost:4200/user";

  private currentUserSubject: BehaviorSubject<UserModule | null>;
  public currentUser$: Observable<UserModule | null>;







  constructor() { }




}
