import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryModel } from '../../models/goods/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = 'http://localhost:3000/category';

  constructor(private http: HttpClient) {}
 
  getAllCategory(): Observable<CategoryModel[]> {
    return this.http.get<CategoryModel[]>(this.apiUrl);
  }

  addCategory(categoryModel: CategoryModel): Observable<CategoryModel> {
    return this.http.post<CategoryModel>(this.apiUrl, categoryModel);
  }

  updateCategory(categoryModel: CategoryModel): Observable<CategoryModel> {
    return this.http.put<CategoryModel>(`${this.apiUrl}/${categoryModel.id}`, categoryModel);
  }

  deleteCategory(id: string ): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
