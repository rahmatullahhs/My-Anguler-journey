import { Component } from '@angular/core';
  import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/model/product';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-purchase',
  standalone: false,
  templateUrl: './purchase.html',
  styleUrl: './purchase.css'
})
export class Purchase {



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
