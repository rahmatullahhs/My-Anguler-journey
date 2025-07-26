import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ProductModel } from '../../models/product.model';
import { BrandService } from '../../services/brand.service';
import { CategoryService } from '../../services/category.service';
import { SupplierService } from '../../services/supplier.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
  editing: boolean = false;
  productForm: FormGroup;

  constructor(
    private productService: ProductService,
    private brandService: BrandService,
    private categoryService: CategoryService,
    private supplierService: SupplierService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.productForm = this.formBuilder.group({
   
      name: ['', Validators.required],
      graphicscard: [''],
      monitor: [''],
      processor: [''],
      ram: [''],
      storage: [''],
      invoice: [''],
      discount: [0],
      paid: [0],
      due: [0],
      price: [0, Validators.min(0)],
      stock_qty: [0, Validators.min(0)],
      brandId: ['', Validators.required],
      categoryId: ['', Validators.required],
      supplierId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadAllData();
  }

  loadAllData(): void {
    this.productService.getAll().subscribe((res: ProductModel[]) => {
      this.products = res;
    });

    this.brandService.getAllBrand().subscribe((res: any[]) => {
      this.brands = res;
    });

    this.categoryService.getAllCategory().subscribe((res: any[]) => {
      this.categories = res;
    });

    this.supplierService.getAllSupplier().subscribe((res: any[]) => {
      this.suppliers = res;
    });
  }

  editProduct(product: ProductModel): void {
    this.editing = true;
    this.productForm.patchValue(product);
  }

  deleteProduct(id: string): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.delete(id).subscribe(() => {
        alert('Product deleted!');
        this.loadAllData(); // refresh all
      });
    }
  }

  cancelEdit(): void {
    this.editing = false;
    this.productForm.reset({
      id: null,
      name: '',
      graphicscard: '',
      monitor: '',
      processor: '',
      ram: '',
      storage: '',
      invoice: '',
      discount: 0,
      paid: 0,
      due: 0,
      price: 0,
      stock_qty: 0,
      brandId: '',
      categoryId: '',
      supplierId: ''
    });
  }

  updateProduct(): void {
    const updatedProduct = this.productForm.value;

    if (!updatedProduct.id) {
      alert('Invalid product ID.');
      return;
    }

    this.productService.update(updatedProduct).subscribe({
      next: () => {
        alert('Product updated successfully!');
        this.loadAllData();
        this.cancelEdit();
      },
      error: (err) => {
        console.error('Update failed:', err);
        alert('Failed to update product. Please try again.');
      }
    });
  }

  goToEditProduct(id: string): void {
    this.router.navigate(['/addproduct', id]);
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
