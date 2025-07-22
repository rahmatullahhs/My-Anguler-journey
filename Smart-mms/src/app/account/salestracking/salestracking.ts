import { Component, OnInit } from '@angular/core';
import { SalestrackingModel } from '../../models/saletracking.model';
import { OrderModel } from '../../models/order.model';
import { SaletrackingService } from '../../services/saletracking.service';
import { Router } from '@angular/router';

@Component({
  standalone:false,
  selector: 'app-salestracking',
  templateUrl: './salestracking.html',
  styleUrls: ['./salestracking.css'] // <-- note the plural 'styleUrls'
})
export class Salestracking implements OnInit {

  sellsTracing: SalestrackingModel[] = [];
  order!: OrderModel;

  constructor(
    private sallesTracingservice: SaletrackingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadSales();
  }

  loadSales(): void {
    this.sallesTracingservice.getAllSells().subscribe({
      next: (result) => {
        this.sellsTracing = result;
        console.log('Sales:', this.sellsTracing);
      },
      error: (err) => {
        console.error('Error loading sales:', err);
      }
    });
  }
}
