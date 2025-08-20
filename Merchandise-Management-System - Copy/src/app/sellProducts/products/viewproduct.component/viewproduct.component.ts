import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../service/product.service';
import { ProductModel } from '../../../models/products/product.model';
import { CartService } from '../../../service/carts/cart.service';
import { CartModel } from '../../../models/products/cart.model';
import { Router } from '@angular/router';

@Component({
  standalone: false,
  selector: 'app-viewproduct',
  templateUrl: './viewproduct.component.html',
  styleUrls: ['./viewproduct.component.css']
})
export class ViewproductComponent implements OnInit {
  cartItems: CartModel[] = [];
  total = 0;
  products: ProductModel[] = [];

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadCart();
  }

  loadProducts(): void {
    this.productService.getAll().subscribe(data => {
      this.products = data;
    });
  }

  loadCart(): void {
    this.cartItems = this.cartService.getCart();
    this.calculateTotal();
  }

  addToCart(product: ProductModel): void {
    this.cartService.addItem(product);
    this.loadCart();
  }

  remove(productId: number): void {
    this.cartService.removeItem(productId);
    this.loadCart();
  }

  updateQuantity(productId: number, quantityStr: string): void {
    const quantity = parseInt(quantityStr, 10);
    this.cartService.updateQuantity(productId, quantity);
    this.loadCart();
  }

  calculateTotal(): void {
    this.total = this.cartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
  }

  getInputValue(event: Event): string {
    const input = event.target as HTMLInputElement;
    return input.value;
  }

  deleteProduct(id: number): void {
    this.productService.deleteProduct(id).subscribe(() => {
      this.loadProducts();
    });
  }

  viewDetails(product: ProductModel): void {
    this.router.navigate(['/product', product.id]);
  }
}
