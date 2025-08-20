import { Injectable } from '@angular/core';
import { CartModel } from '../../models/products/cart.model';
import { ProductModel } from '../../models/products/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
 
  cart: CartModel[] = [];

  getCart(): CartModel[] {
    return this.cart;
  }

  addItem(product: ProductModel): void {
    const item = this.cart.find(c => c.product.id === product.id);
    if (item) {
      if (item.quantity < product.stock) {
        item.quantity++;
      }
    } else {
      this.cart.push({ product, quantity: 1 });
    }
  }

  removeItem(productId: number): void {
    const index = this.cart.findIndex(c => c.product.id === productId);
    if (index !== -1) {
      this.cart.splice(index, 1);
    }
  }

  updateQuantity(productId: number, quantity: number): void {
    const item = this.cart.find(c => c.product.id === productId);
    if (item && quantity > 0 && quantity <= item.product.stock) {
      item.quantity = quantity;
    }
  }

  clearCart(): void {
    this.cart = [];
  }
}


