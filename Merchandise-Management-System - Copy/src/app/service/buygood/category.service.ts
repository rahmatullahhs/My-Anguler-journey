import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryModel } from '../../models/goods/category.model';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private baseUrl = `${environment.apiBaseUrl}/category`;

  constructor(private http: HttpClient) {}

  // Get all categories
  getAllCategory(): Observable<CategoryModel[]> {
    return this.http.get<CategoryModel[]>(this.baseUrl);
  }

  // Add a new category
  addCategory(categoryModel: CategoryModel): Observable<CategoryModel> {
    return this.http.post<CategoryModel>(`${this.baseUrl}/add`, categoryModel);
  }

  // Update an existing category
  updateCategory(categoryModel: CategoryModel): Observable<CategoryModel> {
    return this.http.put<CategoryModel>(`${this.baseUrl}/${categoryModel.id}`, categoryModel);
  }

  // Delete a category by ID
  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  // Get a category by ID (optional utility)
  getCategoryById(id: number): Observable<CategoryModel> {
    return this.http.get<CategoryModel>(`${this.baseUrl}/${id}`);
  }
}
