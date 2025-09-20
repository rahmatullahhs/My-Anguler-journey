import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CartService } from '../../service/sale-product/cart.service';
import { Observable } from 'rxjs';
import { User } from '../../models/profile/user.model';
import { AuthService } from '../../service/auth/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar implements OnInit {
  @Output() toggleSidebar = new EventEmitter<void>();

  user: User | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
  }

  logout(): void {
    this.authService.logout();
  }
}