import { Component } from '@angular/core';
import { ProductModel } from '../../models/product.model';
import { ProductService } from '../../service/product.service';

@Component({
  selector: 'app-addproduct.component',
  standalone: false,
  templateUrl: './addproduct.component.html',
  styleUrl: './addproduct.component.css'
})
export class AddproductComponent {

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

  onSubmit() {
    this.product.id = Date.now(); // simple unique ID
    this.productService.addProduct(this.product);

    // ✅ Reset all required fields
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

