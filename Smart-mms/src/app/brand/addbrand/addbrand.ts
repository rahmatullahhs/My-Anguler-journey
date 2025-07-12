import { Component, OnInit } from '@angular/core';
import { BrandModel } from '../../models/brand.model';

import { BrandService } from '../../services/brand.service';
import { CategoryModel } from '../../models/category.model';
import { HttpClient } from '@angular/common/http';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-addbrand',
  standalone: false,
  templateUrl: './addbrand.html',
  styleUrl: './addbrand.css'
})
export class Addbrand implements OnInit {


  brand: BrandModel = { name: '', categoryId: '' };
  brands: BrandModel[] = [];
  categories: any[] = [];
  isEditMode = false;

  constructor(private brandService: BrandService, 
    private http: HttpClient,
     private catService: CategoryService) { }

  ngOnInit(): void {
    this.loadBrands();
    this.loadCategories();
  }

  loadBrands(): void {
    this.brandService.getAllBrand().subscribe(res => (this.brands = res));
  }

  loadCategories(): void {
    
    this.catService.getAllCategory().subscribe(res => (this.categories = res));
  }

  getCategoryName(id: string | number): string {
    const cat = this.categories.find(c => c.id === id);
    return cat ? cat.name : '';
  }

  onSubmit(): void {
    if (this.isEditMode && this.brand.id) {
      this.brandService.updateBrand(this.brand).subscribe(() => {
        this.loadBrands();
        this.resetForm();
      });
    } else {
      this.brandService.addBrand(this.brand).subscribe(() => {
        this.loadBrands();
        this.resetForm();
      });
    }
  }

  editBrand(b: BrandModel): void {
    this.brand = { ...b };
    this.isEditMode = true;
    this.resetForm();
    this.loadBrands();
  }

  deleteBrand(id: string ): void {
    this.brandService.deleteBrand(id).subscribe(() => {
      this.loadBrands();
    });
  }

  resetForm(): void {
    this.brand = { name: '', categoryId: '' };
    this.isEditMode = false;
  }
}



