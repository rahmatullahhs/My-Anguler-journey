import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { OrderModel } from '../../models/order.model';

@Component({
  selector: 'app-sellhistory',
  standalone: false,
  templateUrl: './sellhistory.html',
  styleUrl: './sellhistory.css'
})
export class Sellhistory implements OnInit{

 SellDate!: Date;
  sellInvoice: string = '';
  customerName: string = '';
  productDetail: string = '';
  totalAmount: number = 0;

constructor(private orderService: OrderService, private cd: ChangeDetectorRef) { }

ngOnInit(): void {
    this.cd.detectChanges();
    // this.loadTotals();
  }


loadTotals(): void {
  this.orderService.getAllOrder().subscribe((orders: OrderModel[]) => {
    if (orders.length > 0) {
      const order = orders[0];

      this.SellDate = new Date(order.orderDate);
      console.log('Sell Date:', this.SellDate);

      this.sellInvoice = order.invoice;
      console.log('Invoice:', this.sellInvoice);

      this.customerName = order.customername;
      console.log('Customer Name:', this.customerName);

      this.productDetail = order.productdetail;
      console.log('Product Detail:', this.productDetail);

      this.totalAmount = order.totalAmount;
      console.log('Total Amount:', this.totalAmount);
    } else {
      console.warn('No orders returned from API.');
    }
  });
}}
