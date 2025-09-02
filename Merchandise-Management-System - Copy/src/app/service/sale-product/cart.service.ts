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

  constructor() {}

  /** Get current cart */
  getCart() {
    return {
      items: this.cartItems,
      total: this.total
    };
  }

  /** Add item to cart */
  addItem(product: ProductModel): void {
    const item = this.cartItems.find(c => c.product.id === product.id);
    if (item) {
      if (item.quantity < product.quantity) {
        item.quantity++;
      }
    } else {
      this.cartItems.push({ product, quantity: 1 });
    }

    this.recalculateCart();
  }

  /** Remove item by product ID */
  removeItem(productId: number): void {
    this.cartItems = this.cartItems.filter(c => c.product.id !== productId);
    this.recalculateCart();
  }

  /** Update item quantity */
  updateQuantity(productId: number, quantity: number): void {
    const item = this.cartItems.find(c => c.product.id === productId);
    if (item && quantity > 0 && quantity <= item.product.quantity) {
      item.quantity = quantity;
    }
    this.recalculateCart();
  }

  /** Clear entire cart */
  clearCart(): void {
    this.cartItems = [];
    this.total = 0;
    this.cartCountSubject.next(0);
  }

  /** Manually set cart (used when navigating between pages) */
  setCart(items: CartModel[], total: number): void {
    this.cartItems = items;
    this.total = total;
    this.cartCountSubject.next(this.cartItems.length);
  }

  /** Internal: Recalculate cart total and count */
  private recalculateCart(): void {
    this.total = this.cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    this.cartCountSubject.next(this.cartItems.length);
  }
}
