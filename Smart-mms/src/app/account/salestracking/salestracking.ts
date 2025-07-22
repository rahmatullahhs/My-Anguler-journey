import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SalestrackingModel } from '../../models/saletracking.model';
import { OrderModel } from '../../models/order.model';
import { SaletrackingService } from '../../services/saletracking.service';
import { Router } from '@angular/router';
import { error } from 'console';
import { OrderService } from '../../services/order.service';

@Component({
  standalone: false,
  selector: 'app-salestracking',
  templateUrl: './salestracking.html',
  styleUrls: ['./salestracking.css'] // <-- note the plural 'styleUrls'
})
export class Salestracking implements OnInit {
  sellsTracing: SalestrackingModel[] = [];
  orders: OrderModel[] = [];

  constructor(
    private salesTrackingService: SaletrackingService,
    private orderService: OrderService,
    private router: Router,
    private cdr:ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadSales();
    this.loadOrders();
  }

  loadSales(): void {
    this.salesTrackingService.getAllSales().subscribe({
      next: (sales) => {
        this.sellsTracing = sales;
        this.cdr.markForCheck();
        console.log('Sales loaded:', sales);
      },
      error: (err) => {
        console.error('Error loading sales:', err);
      }
    });
  }

  loadOrders(): void {
    this.orderService.getAllOrder().subscribe({
      next: (orders) => {
        this.orders = orders;
        this.cdr.markForCheck();
        console.log('Orders loaded:', orders);
      },
      error: (err) => {
        console.error('Error loading orders:', err);
      }
    });
  }

  getOrderById(orderId: string): OrderModel | undefined {
    return this.orders.find(order => order.id === orderId);
  }
}