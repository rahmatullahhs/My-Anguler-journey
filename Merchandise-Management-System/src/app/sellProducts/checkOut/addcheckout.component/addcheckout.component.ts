import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../service/carts/cart.service';

@Component({
  selector: 'app-addcheckout.component',
  standalone: false,
  templateUrl: './addcheckout.component.html',
  styleUrl: './addcheckout.component.css'
})
export class AddcheckoutComponent implements OnInit{
cartItems: any[] = [];
  total: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    const cart = this.cartService.getCart();
    this.cartItems = cart.items;
    this.total = cart.total;
  }
}

