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
  

  totalPaid: number = 0;
  totalAmount: number = 0;
  totalDue: number = 0;

  constructor(private orderService: OrderService, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.cd.detectChanges();
    this.loadTotals();
  }

  loadTotals(): void {
    this.orderService.getAllOrder().subscribe((orders: OrderModel[]) => {
      this.totalPaid = orders.reduce((sum, order) => sum + order.paid, 0);
      console.log(this.totalPaid)
      this.totalAmount = orders.reduce((sum, order) => sum + order.totalAmount, 0);
      console.log(this.totalAmount)
      this.totalDue = orders.reduce((sum, order) => sum + order.due, 0);
      console.log(this.totalDue)
    });
  }

}