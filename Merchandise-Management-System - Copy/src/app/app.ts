import { Component, OnInit, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { CartService } from './service/sale-product/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  standalone:false
})
export class App implements OnInit {
  
scrollToTop(): void {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

  // Page title (using signal, if needed elsewhere)
  protected readonly title = signal('Merchandise-Management-System');

  // Sidebar toggle
  isSidebarCollapsed = true;

  // Reactive cart count
  cartCount$!: Observable<number>;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartCount$ = this.cartService.cartCount$;
  }

  toggleSidebar(): void {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }





}
