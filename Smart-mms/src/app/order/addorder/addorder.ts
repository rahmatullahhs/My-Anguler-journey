import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { OrderService } from '../../services/order.service';
import { Router } from '@angular/router';
import { OrderModel } from '../../models/order.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SalestrackingModel } from '../../models/saletracking.model';
import { SaletrackingService } from '../../services/saletracking.service';

@Component({
  selector: 'app-addorder',
  standalone: false,
  templateUrl: './addorder.html',
  styleUrl: './addorder.css'
})
export class Addorder implements OnInit {
  orderForm!: FormGroup;
  totalprice: number = 0;
  finalprice: number = 0;
  due: number = 0;

  constructor(
    private orderService: OrderService,
    private formBuilder: FormBuilder,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private sts: SaletrackingService
  ) { }

  ngOnInit(): void {
    this.orderForm = this.formBuilder.group({
      invoice: [''],
      date: [''],
      customername: [''],
      customerphone: [''],
      customeremail: [''],
      productdetail: [''],
      productqty: [''],
      price: [''],
      discount: [''],
      paid: [''],
      due: ['']
    });
  }

  addOrder(): void {
    if (this.orderForm.invalid) {
      return;
    }

    const order: OrderModel = { ...this.orderForm.value };
    const salesTracking: SalestrackingModel = new SalestrackingModel(this.orderForm.value.id, this.orderForm.value.saleDate, this.orderForm.value.due);

    this.orderService.saveOrder(order).subscribe({
      next: (res) => {
        console.log("Order saved", res);
        this.orderForm.reset();
        this.router.navigate(['/viewallorder']);
      },
      error: (error) => {
        console.error("Error saving order", error);
      }
    });

    this.sts.saveST(salesTracking).subscribe(data => {
      console.log(data);
    })
  }

  PriceCalculation(): void {
    const price = Number(this.orderForm.value.price) || 0;
    const productqty = Number(this.orderForm.value.productqty) || 0;
    const discount = Number(this.orderForm.value.discount) || 0;
    const paid = Number(this.orderForm.value.paid) || 0;

    this.totalprice = price * productqty;
    this.finalprice = this.totalprice - (this.totalprice * discount / 100);
    this.due = this.finalprice - paid;

    this.orderForm.patchValue({
      due: this.due
    }, { emitEvent: false });
  }

  onFocusLost(): void {
    this.PriceCalculation();
  }
}


