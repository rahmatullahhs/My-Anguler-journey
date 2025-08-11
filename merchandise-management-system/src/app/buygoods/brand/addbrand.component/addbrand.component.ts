import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BrandModel } from '../../../models/goods/brand.model';
import { BrandService } from '../../../service/buygood/brand.service';
import { CategoryService } from '../../../service/buygood/category.service';
import { CategoryModel } from '../../../models/goods/category.model';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-addbrand.component',
  standalone: false,
  templateUrl: './addbrand.component.html',
  styleUrl: './addbrand.component.css'
})
export class AddbrandComponent implements OnInit {
  brandForm!: FormGroup;
  brands: BrandModel[] = [];
  categories: CategoryModel[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private brandService: BrandService,
    private router: Router,
    private catService: CategoryService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.brandForm = this.formBuilder.group({
      name: ['', Validators.required],
      categoryId: ['', Validators.required]
    });

    this.loadCategories();
    this.loadBrands();
  }

  loadCategories(): void {
    this.catService.getAllCategory().subscribe(res => {
      this.categories = res;
      this.cdr.markForCheck();
    });
  }

  loadBrands(): void {
    this.brandService.getAllBrand().subscribe(res => {
      this.brands = res;
      this.cdr.markForCheck();
    });
  }

getCategoryName(id: number): string {
  const cat = this.categories.find(c => c.id === id);
  return cat ? cat.name : 'N/A'; // or '' if you prefer
}


  onSubmit(): void {
    if (this.brandForm.invalid) return;

    const newBrand: BrandModel = this.brandForm.value;
    this.brandService.addBrand(newBrand).subscribe({
      next: res => {
        console.log('Brand saved:', res);
        this.brandForm.reset();
        this.loadBrands();
      },
      error: err => {
        console.error('Error:', err);
      }
    });
  }

  resetForm(): void {
    this.brandForm.reset();
  }

  editBrand(brand: BrandModel): void {
    this.brandForm.patchValue(brand);
  }

  deleteBrand(id: number): void {
    this.brandService.deleteBrand(id).subscribe({
      next: () => {
        this.loadBrands();
      },
      error: err => {
        console.error('Delete error:', err);
      }
    });
  }
}
