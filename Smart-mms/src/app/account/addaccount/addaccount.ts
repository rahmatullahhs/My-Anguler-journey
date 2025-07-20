import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addaccount',
  standalone: false,
  templateUrl: './addaccount.html',
  styleUrl: './addaccount.css'
})
export class Addaccount {

  constructor(private router: Router) {}

  goTo(page: string) {
    switch (page) {
      case 'master-ledger':
        this.router.navigate(['/master-ledger']);
        break;
      case 'billstracking':
        this.router.navigate(['/bill-records']);
        break;
      case 'sales-records':
        this.router.navigate(['/sales-records']);
        break;
      case 'cogs':
        this.router.navigate(['/cogs']);
        break;
      case 'product-price':
        this.router.navigate(['/product-price']);
        break;
      default:
        console.warn('Unknown page:', page);
    }
  }
}


