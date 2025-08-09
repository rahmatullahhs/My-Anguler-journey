import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  standalone:false,   
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {
  productForm!: FormGroup;
  editing: boolean = false;
  products: ProductModel[] = [];

  brands: BrandModel[] = [];
  categories: CategoryModel[] = [];
  suppliers: SupplierModel[] = [];

  totalPrice: number = 0;
  finalPrice: number = 0;
  due: number = 0;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private productService: ProductService,
    private brandService: BrandService,
    private categoryService: CategoryService,
    private supplierService: SupplierService,
    private ledgerbookService: LedgerbookService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadBrands();
    this.loadCategories();
    this.loadSuppliers();

    this.productForm.valueChanges.subscribe(() => this.calculatePrice());
  }

  initializeForm(): void {
    this.productForm = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      details: [''],
      invoice: [''],
      discount: [0],
      paid: [0],
      due: [0],
      price: [0, Validators.required],
      qty: [0, Validators.required],
      date: [new Date()],
      brandId: ['', Validators.required],
      categoryId: ['', Validators.required],
      supplierId: ['', Validators.required]
    });
  }

  loadBrands(): void {
    this.brandService.getAllBrand().subscribe({
      next: res => (this.brands = res),
      error: err => console.error('Error loading brands:', err)
    });
  }

  loadCategories(): void {
    this.categoryService.getAllCategory().subscribe({
      next: res => (this.categories = res),
      error: err => console.error('Error loading categories:', err)
    });
  }

  loadSuppliers(): void {
    this.supplierService.getAllSupplier().subscribe({
      next: res => (this.suppliers = res),
      error: err => console.error('Error loading suppliers:', err)
    });
  }

  onSubmit(): void {
    if (this.productForm.invalid) {
      alert('Please fill in all required fields.');
      return;
    }

    const formValue = this.productForm.value;

    this.productService.add(formValue).subscribe((createdProduct: ProductModel) => {
      alert('Product added successfully!');
      this.productForm.reset();
      this.router.navigate(['/viewallstock']);

      const ledgerEntry: LedgerbookModel = {
        productId: createdProduct.id!,
        date: new Date(),
        paid: formValue.paid,
        due: this.due,
        debit: 0,
        credit: 0,
        account: ''
      };

      // Determine accounting behavior
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
    });
  }

  calculatePrice(): void {
    const price = Number(this.productForm.value.price) || 0;
    const qty = Number(this.productForm.value.qty) || 0;
    const discount = Number(this.productForm.value.discount) || 0;
    const paid = Number(this.productForm.value.paid) || 0;

    this.totalPrice = price * qty;
    this.finalPrice = this.totalPrice - (this.totalPrice * (discount / 100));
    this.due = this.finalPrice - paid;

    this.productForm.patchValue({ due: this.due }, { emitEvent: false });
  }
}
