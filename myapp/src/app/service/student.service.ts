import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../model/student.model';


@Injectable({
  providedIn: 'root'
})
export class StudentService {
// is simply declaring a class property (often in a service) that stores the API endpoint's base URL.
//  We use it so that when you make HTTP requests (e.g., GET, POST, etc.), 
// you don’t have to hardcode the full URL every time.
// endpoint is a specific address where you make requests.
  baseUrl: string = "http://localhost:3000/students";
// you’re using Angular’s dependency injection to get an instance of the HttpClient service into your class 
// (whether it's a component or a service).
  constructor(private http: HttpClient) { }

// GET → read data
// POST → create data
// PUT / PATCH → update data
// DELETE → delete data

//  Fetches data from your API
// It calls your API at the baseUrl, using HttpClient.
// It returns an Observable that:
// Defers execution until subscribed.
// Emits exactly one response (a list of students) then completes.
  getAllStudent(): Observable<any> {
    return this.http.get(this.baseUrl);
  }


  saveStudent(student: Student): Observable<any> {
    return this.http.post(this.baseUrl, student);
  }


deleteStudent(id:string):Observable<any>{
return this.http.delete(this.baseUrl+"/"+id);
}


getStudentById(id:string):Observable<any>{
return this.http.get(this.baseUrl+'/'+id);
}

updateStudent(id:string,student:Student):Observable<any>{

return this.http.put(this.baseUrl+'/'+id,student);

}










}
