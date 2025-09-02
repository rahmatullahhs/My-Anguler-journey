import { Component, OnInit } from '@angular/core';
import { ProductPriceModel } from '../../../models/Accounts/productprice.model';
import { ProductPriceService } from '../../../service/Accounts/productPrice.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-productsprice.component',
  standalone: false,
  templateUrl: './productsprice.component.html',
  styleUrl: './productsprice.component.css'
})
export class ProductspriceComponent implements OnInit{



  ppForm: FormGroup;
  isEditMode: boolean = false;
  productPrices: ProductPriceModel[] = [];

  constructor(
    private fb: FormBuilder,
    private productPriceService: ProductPriceService // Inject your service here
  ) {
    this.ppForm = this.fb.group({
      id: [null],
      date: [''],
      productName: [''],
      productQty: [0 ],
      productPrice: [0 ], // Cogs amount
      eachProductPrice: [0 ]
    });
  }

  ngOnInit(): void {
    this.loadProductPrices();
  }

  loadProductPrices(): void {
    this.productPriceService.getProductPrices().subscribe(
      (data) => {
        this.productPrices = data;
      },
      (error) => {
        console.error('Error fetching product prices:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.ppForm.valid) {
      const productPrice: ProductPriceModel = this.ppForm.value;
      if (this.isEditMode) {
        this.productPriceService.updateProductPrice(productPrice.id, productPrice).subscribe(
          () => {
            this.loadProductPrices();
            this.resetForm();
          },
          (error) => {
            console.error('Error updating product price:', error);
          }
        );
      } else {
        this.productPriceService.addProductPrice(productPrice).subscribe(
          () => {
            this.loadProductPrices();
            this.resetForm();
          },
          (error) => {
            console.error('Error adding product price:', error);
          }
        );
      }
    }
  }

  resetForm(): void {
    this.ppForm.reset();
    this.isEditMode = false;
  }

  addProductPrice(): void {
    this.resetForm();
    this.isEditMode = false;
  }

  deleteProductPrice(id: number): void {
    if (id) {
      this.productPriceService.deleteProductPrice(id).subscribe(
        () => {
          this.loadProductPrices();
        },
        (error) => {
          console.error('Error deleting product price:', error);
        }
      );
    }
  }

  editProductPrice(price: ProductPriceModel): void {
    this.ppForm.patchValue(price);
    this.isEditMode = true;
  }
}
