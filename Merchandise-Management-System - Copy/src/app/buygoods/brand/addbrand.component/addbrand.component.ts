import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BrandModel } from '../../../models/goods/brand.model';
import { BrandService } from '../../../service/buygood/brand.service';
import { HttpClient } from '@angular/common/http';
import { CategoryService } from '../../../service/buygood/category.service';
import { CategoryModel } from '../../../models/goods/category.model';

@Component({
  selector: 'app-addbrand.component',
  standalone: false,
  templateUrl: './addbrand.component.html',
  styleUrl: './addbrand.component.css'
})
export class AddbrandComponent implements OnInit{
  brand: BrandModel = { name: '', categoryId: '' };
  brands: BrandModel[] = [];
  categories: CategoryModel[] = [];
  isEditMode = false;

  constructor(
    private brandService: BrandService,
    private http: HttpClient,
    private catService: CategoryService,
    private cdr: ChangeDetectorRef // ✅ Moved to constructor
  ) {}

  ngOnInit(): void {
    this.loadBrands();
    this.loadCategories();
  }

  loadBrands(): void {
    this.brandService.getAllBrand().subscribe(res => {
      this.brands = res;
      this.cdr.markForCheck(); // Optional, only if using OnPush
    });
  }

  loadCategories(): void {
    this.catService.getAllCategory().subscribe(res => {
      this.categories = res;
      this.cdr.markForCheck(); // Optional
    });
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
  }

  deleteBrand(id: string): void {
    this.brandService.deleteBrand(id).subscribe(() => {
      this.loadBrands();
    });
  }

  resetForm(): void {
    this.brand = { name: '', categoryId: '' ,id:''};
    this.isEditMode = false;
  }
}
