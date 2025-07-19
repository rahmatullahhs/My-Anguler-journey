import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ProductModel } from '../../models/product.model';
import { BrandService } from '../../services/brand.service';
import { CategoryService } from '../../services/category.service';
import { SupplierService } from '../../services/supplier.service';

@Component({
  selector: 'app-view-allstock',
  standalone: false,
  templateUrl: './view-allstock.html',
  styleUrl: './view-allstock.css'
})
export class ViewAllstock implements OnInit {
  products: ProductModel[] = [];
  
  brands: any[] = [];
  categories: any[] = [];
  suppliers: any[] = [];

  constructor(
    private productService: ProductService,
    private brandService: BrandService,
    private categoryService: CategoryService,
    private supplierService: SupplierService
  ) {}

  ngOnInit(): void {
    this.loadAllData();
  }

  loadAllData(): void {
    this.productService.getAll().subscribe(res => {
      this.products = res;
    });

    this.brandService.getAllBrand().subscribe(res => {
      this.brands = res;
    });

    this.categoryService.getAllCategory().subscribe(res => {
      this.categories = res;
    });

    this.supplierService.getAllSupplier().subscribe(res => {
      this.suppliers = res;
    });
  }










  
  getBrandName(brandId: string): string {
    return this.brands.find(b => b.id === brandId)?.name || 'N/A';
  }

  getCategoryName(categoryId: string): string {
    return this.categories.find(c => c.id === categoryId)?.name || 'N/A';
  }

  getSupplierName(supplierId: string): string {
    return this.suppliers.find(s => s.id === supplierId)?.name || 'N/A';
  }
}
