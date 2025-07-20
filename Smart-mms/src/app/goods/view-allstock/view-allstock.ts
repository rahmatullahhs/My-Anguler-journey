import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ProductModel } from '../../models/product.model';
import { BrandService } from '../../services/brand.service';
import { CategoryService } from '../../services/category.service';
import { SupplierService } from '../../services/supplier.service';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  ) {this.productForm = this.formBuilder.group({
      id: [null],
      name: ['', ],
      graphicscard: [''],
      monitor: [''],
      processor: [''],
      ram: [''],
      storage: [''],
      invoice: [''],
      discount: [0],
      paid: [0],
      due: [0],
      price: [0],
      stock_qty: [0],
      brandId: ['', ],
      categoryId: ['',],
      supplierId: ['']
    });
  }

  ngOnInit(): void {
    this.loadAllData();
  }

  loadProducts(): void {
    this.productService.getAll().subscribe(res => {
      this.products = res;
    });
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



 editProduct(product: ProductModel): void {
    this.editing = true;
    this.productForm.patchValue(product
      
    );
  }

  deleteProduct(id: string): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.delete(id).subscribe(() => {
        alert('Product deleted!');
        this.loadProducts();
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

  this.productService.update(updatedProduct.id).subscribe({
    next: () => {
      alert('Product updated successfully!');
      this.loadProducts();
      this.cancelEdit(); // Reset form and exit edit mode
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
