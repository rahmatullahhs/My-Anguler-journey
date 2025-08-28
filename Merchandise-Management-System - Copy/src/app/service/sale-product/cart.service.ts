import { Injectable } from '@angular/core';
import { CartModel } from '../../models/products/cart.model';
import { ProductModel } from '../../models/products/product.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartItems: CartModel[] = [];
  private total: number = 0;

  private cartCountSubject = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCountSubject.asObservable();

  getCart() {
    return {
      items: this.cartItems,
      total: this.total
    };
  }

  addItem(product: ProductModel): void {
    const item = this.cartItems.find(c => c.product.id === product.id);
    if (item) {
      if (item.quantity < product.stock) {
        item.quantity++;
      }
    } else {
      this.cartItems.push({ product, quantity: 1 });
    }
  }

  removeItem(productId: number): void {
    const index = this.cartItems.findIndex(c => c.product.id === productId);
    if (index !== -1) {
      this.cartItems.splice(index, 1);
    }
  }

  updateQuantity(productId: number, quantity: number): void {
    const item = this.cartItems.find(c => c.product.id === productId);
    if (item && quantity > 0 && quantity <= item.product.stock) {
      item.quantity = quantity;
    }
  }

  clearCart(): void {
    this.cartItems = [];
    this.total = 0;
  }
  setCart(items: any[], total: number) {
    this.cartItems = items;
    this.total = total;
  }




}


