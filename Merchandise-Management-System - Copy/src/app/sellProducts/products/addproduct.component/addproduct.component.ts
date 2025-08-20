import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../service/product.service';
import { ProductModel } from '../../../models/products/product.model';

@Component({
  standalone:false,
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css'] // ✅ use "styleUrls" instead of "styleUrl"
})
export class AddproductComponent implements OnInit {
  product: ProductModel = {
    id: 0,
    name: '',
    category: 'Laptop',
    brand: '',
    stock: 0,
    price: 0,
    model: '',
    details: ''
  };

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    // ✅ No need to throw error; leave empty or initialize logic
  }

  onSubmit() {
    this.product.id = Date.now(); // Unique ID

    // Send product to backend
    this.productService.addProduct(this.product).subscribe({
      next: (response) => {
        console.log('Product added:', response);
        // ✅ Reset form
        this.resetForm();
      },
      error: (error) => {
        console.error('Error adding product:', error);
      }
    });
  }

  resetForm() {
    this.product = {
      id: 0,
      name: '',
      category: 'Laptop',
      brand: '',
      stock: 0,
      price: 0,
      model: '',
      details: ''
    };
  }
}
