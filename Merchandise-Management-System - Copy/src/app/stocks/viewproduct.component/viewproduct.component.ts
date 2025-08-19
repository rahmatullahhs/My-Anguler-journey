import { Component } from '@angular/core';
import { ProductModel } from '../../models/product.model';
import { ProductService } from '../../service/product.service';

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
