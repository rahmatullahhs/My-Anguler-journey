import { Component, OnInit } from '@angular/core';

import { ProductModel } from '../../../models/products/product.model';
import { CartService } from '../../../service/sale-product/cart.service';
import { CartModel } from '../../../models/products/cart.model';
import { Router } from '@angular/router';
import { ProductService } from '../../../service/sale-product/product.service';

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
    this.loadProduct();
    this.loadCart();
  }

  loadProduct(): void {
    this.productService.getAll().subscribe(data => {
      this.products = data;
    });
  }

  remove(productId: number): void {
    this.cartService.removeItem(productId);
    this.loadCart();
  }

updateQuantity(productId: number, quantityStr: string): void {
  const quantity = parseInt(quantityStr, 10);
  this.cartService.updateQuantity(productId, quantity);
  this.loadCart(); // this will now recalculate total as well
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




  goToCheckout() {
  this.cartService.setCart(this.cartItems, this.total);
  this.router.navigate(['/invoice']);
}


loadCart(): void {
  const cart = this.cartService.getCart(); // returns { items: CartModel[], total: number }
  this.cartItems = cart.items;

  // Instead of relying on cart.total, recalculate from items
  this.calculateTotal();
}


  addToCart(product: ProductModel): void {
    this.cartService.addItem(product);
    this.loadCart();
  }
}
