import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CartService } from '../../service/sale-product/cart.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar implements OnInit {

  @Output() toggleSidebar = new EventEmitter<void>();

  cartCount$!: Observable<number>;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartCount$ = this.cartService.cartCount$;
  }

}
