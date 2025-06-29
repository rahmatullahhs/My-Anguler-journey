import { Component } from '@angular/core';

@Component({
  selector: 'app-purchase',
  standalone: false,
  templateUrl: './purchase.html',
  styleUrl: './purchase.css'
})
export class Purchase {

  import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/models/product.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
})
export class PurchaseComponent implements OnInit {
  purchaseForm: FormGroup;
  products: Product[] = [];
  message: string = '';

  constructor(private fb: FormBuilder, private dataService: DataService) {
    this.purchaseForm = this.fb.group({
      productId: ['', Validators.required],
      qty: [1, [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit(): void {
    this.products = this.dataService.getProducts();
  }

  onSubmit() {
    if (this.purchaseForm.valid) {
      const productId = this.purchaseForm.value.productId;
      const qty = this.purchaseForm.value.qty;

      const result = this.dataService.purchaseProduct(productId, qty);

      if (result === 'success') {
        this.message = `✅ Purchase complete! Added ${qty} units.`;
      } else {
        this.message = '❌ Product not found.';
      }

      this.purchaseForm.reset({ productId: '', qty: 1 });
    }
  }
}

}
