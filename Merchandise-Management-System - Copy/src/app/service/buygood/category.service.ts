import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryModel } from '../../models/goods/category.model';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

 private baseUrl = environment.apiBaseUrl + '/category';

  constructor(private http: HttpClient,
    
  ) {}
 
  getAllCategory(): Observable<CategoryModel[]> {
    return this.http.get<CategoryModel[]>(this.baseUrl);
  }

  addCategory(categoryModel: CategoryModel): Observable<CategoryModel> {
    return this.http.post<CategoryModel>(this.baseUrl+'add', categoryModel);
  }

  updateCategory(category: CategoryModel): Observable<CategoryModel> {
    return this.http.put<CategoryModel>(`${this.baseUrl}/${category.id}`, category);
  }

  deleteCategory(id: string ): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}${id}`);
  }
  
  // To Find Employee By ID
  getCategoryById(id: string): Observable<any>{
    return this.http.get(this.baseUrl+"/"+id);
  }


}
