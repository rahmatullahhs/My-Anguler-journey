import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  baseUrl: string="http://localhost:3000/students";
  constructor(private http:HttpClient) { }
}


