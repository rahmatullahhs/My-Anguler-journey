import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryModel } from '../../models/goods/category.model';
import { environment } from '../../../environment/environment';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private baseUrl = `${environment.apiBaseUrl}/category`;

  constructor(private http: HttpClient,
      @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  // Get all categories
  getAllCategory(): Observable<CategoryModel[]> {
    return this.http.get<CategoryModel[]>(this.baseUrl);
  }

  // Add a new category
  addCategory(categoryModel: CategoryModel): Observable<CategoryModel> {

    let headers = new HttpHeaders();
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('authToken');
      if (token) {
        headers = headers.set('Authorization', 'Bearer ' + token);
      }
    }
    return this.http.post<CategoryModel>(`${this.baseUrl}/add`, categoryModel,{headers});
  }

  // Update an existing category
  updateCategory(categoryModel: CategoryModel): Observable<CategoryModel> {
    
    let headers = new HttpHeaders();
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('authToken');
      if (token) {
        headers = headers.set('Authorization', 'Bearer ' + token);
      }
    }

    return this.http.put<CategoryModel>(`${this.baseUrl}/${categoryModel.id}`, categoryModel,{headers});
  }

  // Delete a category by ID
  deleteCategory(id: number): Observable<void> {
    
    let headers = new HttpHeaders();
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('authToken');
      if (token) {
        headers = headers.set('Authorization', 'Bearer ' + token);
      }
    }

    return this.http.delete<void>(`${this.baseUrl}/${id}`,{headers});
  }

  // Get a category by ID (optional utility)
  getCategoryById(id: number): Observable<CategoryModel> {
    
    let headers = new HttpHeaders();
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('authToken');
      if (token) {
        headers = headers.set('Authorization', 'Bearer ' + token);
      }
    }

    return this.http.get<CategoryModel>(`${this.baseUrl}/${id}`,{headers});
  }
}
