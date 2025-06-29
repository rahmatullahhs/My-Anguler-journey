import { Component } from '@angular/core';

@Component({
  selector: 'app-sales',
  standalone: false,
  templateUrl: './sales.html',
  styleUrl: './sales.css'
})
export class Sales {
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
})
export class SalesComponent implements OnInit {
  salesForm: FormGroup;
  products: Product[] = [];
  message: string = '';

  constructor(private fb: FormBuilder, private dataService: DataService) {
    this.salesForm = this.fb.group({
      productId: ['', Validators.required],
      qty: [1, [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit(): void {
    this.products = this.dataService.getProducts();
  }

  onSubmit() {
    if (this.salesForm.valid) {
      const productId = this.salesForm.value.productId;
      const qty = this.salesForm.value.qty;

      const result = this.dataService.sellProduct(productId, qty);

      if (result === 'success') {
        this.message = `✅ Sale completed! Sold ${qty} unit(s).`;
      } else if (result === 'not-enough-stock') {
        this.message = '❌ Not enough stock available!';
      } else {
        this.message = '❌ Product not found.';
      }

      this.salesForm.reset({ productId: '', qty: 1 });
    }
  }
}





}
