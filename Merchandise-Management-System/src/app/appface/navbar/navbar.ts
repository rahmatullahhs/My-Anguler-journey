import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CartService } from '../../service/sale-product/cart.service';
import { Observable } from 'rxjs';
import { User } from '../../models/profile/user.model';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar implements OnInit {

  @Output() toggleSidebar = new EventEmitter<void>();

  cartCount$!: Observable<number>;
  userRole: string | null = '';
  currentUser: User | null = null;
  
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartCount$ = this.cartService.cartCount$;
  }

}
