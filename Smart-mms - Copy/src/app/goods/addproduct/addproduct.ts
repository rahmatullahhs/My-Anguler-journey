import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';

import { ProductService } from "../../services/product.service";
import { BrandService } from "../../services/brand.service";
import { CategoryService } from "../../services/category.service";
import { SupplierService } from "../../services/supplier.service";
import { LedgerbookService } from "../../services/ledgerbook.service";

import { ProductModel } from "../../models/product.model";
import { LedgerbookModel } from "../../models/ledgerbook.model";
import { BrandModel } from "../../models/brand.model";
import { CategoryModel } from "../../models/category.model";
import { SupplierModel } from "../../models/supplier.model";

@Component({
  standalone:false,
  selector: 'app-addproduct',
  templateUrl: './addproduct.html',
  styleUrls: ['./addproduct.css']
})
export class AddProduct implements OnInit {
  productForm: FormGroup;
  editing: boolean = false;
  products: ProductModel[] = [];
  categories: CategoryModel[] = [];
  brands: BrandModel[] = [];
  supplier: SupplierModel[] = [];

  totalprice: number = 0;
  finalprice: number = 0;
  due: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private brandService: BrandService,
    private categoryService: CategoryService,
    private supplierService: SupplierService,
    private ledgerbookService: LedgerbookService
  ) {
    this.productForm = this.formBuilder.group({
      id: [null],
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
      price: [0],
      stock_qty: [0],
      brandId: ['', Validators.required],
      categoryId: ['', Validators.required],
      supplierId: ['']
    });
  }

  ngOnInit(): void {
    this.loadProducts();
    this.loadBrands();
    this.loadCategories();
    this.loadSupplier();

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editing = true;
      this.productService.getById(id).subscribe()
        this.productForm.patchValue(this.products);
      
    }

    this.productForm.valueChanges.subscribe(() => {
      this.PriceCalculation();
    });
  }

  loadProducts(): void {
    this.productService.getAll().subscribe(res => {
      this.products = res;
    });
  }

  loadBrands(): void {
    this.brandService.getAllBrand().subscribe({
      next: res => this.brands = res,
      error: err => console.error('Error loading brands:', err)
    });
  }

  loadCategories(): void {
    this.categoryService.getAllCategory().subscribe({
      next: res => this.categories = res,
      error: err => console.error('Error loading categories:', err)
    });
  }

  loadSupplier(): void {
    this.supplierService.getAllSupplier().subscribe({
      next: res => this.supplier = res,
      error: err => console.error('Error loading suppliers:', err)
    });
  }

  onSubmit(): void {
    if (!this.productForm.valid) {
      alert('Please fill in required fields.');
      return;
    }

    const formValue = this.productForm.value;

    if (this.editing && formValue.id) {
      this.productService.update(formValue).subscribe(() => {
        alert('Product updated successfully!');
        this.router.navigate(['/viewallstock']);
      });
    } else {
      const newProduct: ProductModel = { ...formValue };
      this.productService.add(newProduct).subscribe((createdProduct: ProductModel) => {
        alert('Product added successfully!');
        this.createLedgerEntry(createdProduct);
        this.router.navigate(['/viewallstock']);
      });
    }
  }

  createLedgerEntry(createdProduct: ProductModel): void {
    const formValue = this.productForm.value;

    const ledgerEntry: LedgerbookModel = {
      productId: createdProduct.id!,
      date: new Date(),
      paid: formValue.paid,
      due: this.due,
      debit: 0,
      credit: 0,
      account: ''
    };

    if (formValue.paid > 0 && this.due === 0) {
      ledgerEntry.debit = formValue.paid;
      ledgerEntry.credit = formValue.paid;
      ledgerEntry.account = 'Cash Purchase';
    } else if (this.due > 0 && formValue.paid === 0) {
      ledgerEntry.debit = this.due;
      ledgerEntry.credit = 0;
      ledgerEntry.account = 'Accounts Payable';
    } else if (formValue.paid > 0 && this.due > 0) {
      ledgerEntry.debit = formValue.paid + this.due;
      ledgerEntry.credit = formValue.paid;
      ledgerEntry.account = 'Partially Paid';
    }

    this.ledgerbookService.add(ledgerEntry).subscribe(() => {
      console.log('Ledger entry created.');
    });
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

  getBrandName(brandId: string): string {
    return this.brands.find(b => b.id === brandId)?.name || 'N/A';
  }

  getCategoryName(categoryId: string): string {
    return this.categories.find(c => c.id === categoryId)?.name || 'N/A';
  }

  getSupplierName(supplierId: string): string {
    return this.supplier.find(s => s.id === supplierId)?.name || 'N/A';
  }

  PriceCalculation(): void {
    const price = Number(this.productForm.value.price) || 0;
    const stock_qty = Number(this.productForm.value.stock_qty) || 0;
    const discount = Number(this.productForm.value.discount) || 0;
    const paid = Number(this.productForm.value.paid) || 0;

    this.totalprice = price * stock_qty;
    this.finalprice = this.totalprice - (this.totalprice * (discount / 100));
    this.due = this.finalprice - paid;

    this.productForm.patchValue({ due: this.due }, { emitEvent: false });
  }

  onFocusLost(): void {
    this.PriceCalculation();
  }
}
