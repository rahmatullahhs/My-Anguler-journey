import { Component, OnInit } from '@angular/core';
import { GoodModel } from '../../../models/goods/good.model';
import { GoodService } from '../../../service/buygood/good.service';
import { Router } from '@angular/router';
import { CategoryModel } from '../../../models/goods/category.model';
import { BrandModel } from '../../../models/goods/brand.model';
import { SupplierModel } from '../../../models/human/supplier.model';
import { CategoryService } from '../../../service/buygood/category.service';
import { BrandService } from '../../../service/buygood/brand.service';
import { SupplierService } from '../../../service/mankind/supplier.service';

@Component({
  standalone: false,
  selector: 'app-viewgood',
  templateUrl: './viewgood.component.html',
  styleUrls: ['./viewgood.component.css']
})
export class ViewgoodComponent implements OnInit {

  goodModel: GoodModel[] = [];
  categories: CategoryModel[] = [];
  brands: BrandModel[] = [];
  supplier: SupplierModel[] = [];

  searchText: string = '';  // Search text binding

  constructor(
    private goodService: GoodService,
    private brandService: BrandService,
    private categoryService: CategoryService,
    private supplierService: SupplierService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadGoods();
    this.loadBrands();
    this.loadCategories();
    this.loadSuppliers();
  }

  loadGoods(): void {
    this.goodService.getAllGoods().subscribe(res => {
      this.goodModel = res;
    });
  }

  loadBrands(): void {
    this.brandService.getAllBrand().subscribe(res => {
      this.brands = res;
    });
  }

  loadCategories(): void {
    this.categoryService.getAllCategory().subscribe(res => {
      this.categories = res;
    });
  }

  loadSuppliers(): void {
    this.supplierService.getAllSupplier().subscribe(res => {
      this.supplier = res;
    });
  }

  deleteGoods(id: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.goodService.deleteGoods(id).subscribe(() => {
        alert('Product deleted!');
        this.loadGoods();
      });
    }
  }

  editGoods(product: GoodModel): void {
    this.router.navigate(['/addgoods'], { queryParams: { id: product.id } });
  }

  getBrandName(id: number): string {
    return this.brands.find(b => b.id === id)?.name || 'N/A';
  }

  getCategoryName(id: number): string {
    return this.categories.find(c => c.id === id)?.name || 'N/A';
  }

  getSupplierName(id: number): string {
    return this.supplier.find(s => s.id === id)?.name || 'N/A';
  }

  // Filtered goods based on search text
  get filteredGoods(): GoodModel[] {
    if (!this.searchText.trim()) {
      return this.goodModel;
    }
    const searchLower = this.searchText.toLowerCase();

    return this.goodModel.filter(product =>
      product.name.toLowerCase().includes(searchLower) ||
      this.getBrandName(product.brand.id).toLowerCase().includes(searchLower) ||
      this.getCategoryName(product.category.id).toLowerCase().includes(searchLower) ||
      this.getSupplierName(product.supplier.id).toLowerCase().includes(searchLower)
    );
  }
}
