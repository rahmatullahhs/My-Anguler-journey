import { Component } from '@angular/core';
import { ProductService } from '../../../service/product.service';
import { ProductModel } from '../../../models/products/product.model';

@Component({
  selector: 'app-viewproduct.component',
  standalone: false,
  templateUrl: './viewproduct.component.html',
  styleUrl: './viewproduct.component.css'
})
export class ViewproductComponent {
  products: ProductModel[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getAll().subscribe(data => {
      this.products = data;
    });
  }

  deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe(() => {
      this.loadProducts(); // Refresh list
    });
  }
}

