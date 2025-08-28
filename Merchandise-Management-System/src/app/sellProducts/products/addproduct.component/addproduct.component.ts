import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { ProductModel } from '../../../models/products/product.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../../service/sale-product/product.service';

@Component({
  standalone: false,
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {
  formGroup!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private router: Router,
    public cdr:ChangeDetectorRef  ) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      name: ['', Validators.required],
      category: ['Laptop', Validators.required],
      brand: ['', Validators.required],
      quantity: [0, [Validators.required, Validators.min(0)]],
      price: [0, [Validators.required, Validators.min(0)]],
      model: ['', Validators.required],
      details: ['', Validators.required]
    });
  }

  addProduct(): void {
    if (this.formGroup.invalid) return;

    const product: ProductModel = { ...this.formGroup.value };

    this.productService.addProduct(product).subscribe({
      next: (res) => {
        console.log('Product Saved:', res);
        this.formGroup.reset 
         this.router.navigate(['/viewproduct']); 
        this.cdr.markForCheck();
             },
      error: (error) => {
        console.error('Error saving product:', error);
      }
    });
  }
}
