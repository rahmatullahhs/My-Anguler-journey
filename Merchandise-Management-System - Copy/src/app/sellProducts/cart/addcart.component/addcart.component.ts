import { Component, OnInit } from '@angular/core';
import { CartModel } from '../../../models/products/cart.model';
import { CartService } from '../../../service/sale-product/cart.service';

@Component({
  selector: 'app-addcart.component',
  standalone: false,
  templateUrl: './addcart.component.html',
  styleUrl: './addcart.component.css'
})
export class AddcartComponent implements OnInit {

  cartItems: CartModel[] = [];
  total = 0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    const cart = this.cartService.getCart();
    this.cartItems = cart.items;
    this.total = cart.total;
  }


  updateQuantity(productId: number, quantityStr: string): void {
    const quantity = parseInt(quantityStr, 10);
    this.cartService.updateQuantity(productId, quantity);
    this.loadCart();
  }

  remove(productId: number): void {
    this.cartService.removeItem(productId);
    this.loadCart();
  }

  calculateTotal(): void {
    this.total = this.cartItems.reduce((sum, item) =>
      sum + item.product.price * item.quantity, 0);
  }




  getInputValue(event: Event): string {
    const input = event.target as HTMLInputElement;
    return input.value;
  }


}


