import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Router } from '@angular/router';
import { OrderModel } from '../../models/order.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SalestrackingModel } from '../../models/saletracking.model';
import { SaletrackingService } from '../../services/saletracking.service';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';

@Component({
  standalone:false,
  selector: 'app-addorder',
  templateUrl: './addorder.html',
  styleUrls: ['./addorder.css'] // ✅ Fixed styleUrls
})
export class Addorder implements OnInit {
  orderForm!: FormGroup;
  totalprice: number = 0;
  finalprice: number = 0;
  due: number = 0;
  orders: OrderModel[] = [];

  constructor(
    private orderService: OrderService,
    private formBuilder: FormBuilder,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private sts: SaletrackingService
  ) {}

  ngOnInit(): void {
    this.orderForm = this.formBuilder.group({
      invoice: ['', Validators.required],
      date: ['', Validators.required],
      customername: ['', Validators.required],
      customerphone: [''],
      customeremail: [''],
      productdetail: [''],
      productqty: [1, Validators.required],
      price: [0, Validators.required],
      discount: [0],
      paid: [0],
      due: [0]
    });

    this.loadOrders();
  }

  loadOrders(): void {
    this.orderService.getAllOrder().subscribe(res => {
      this.orders = res;
      this.cdr.markForCheck();
    });
  }

  PriceCalculation(): void {
    const price = Number(this.orderForm.value.price) || 0;
    const qty = Number(this.orderForm.value.productqty) || 0;
    const discount = Number(this.orderForm.value.discount) || 0;
    const paid = Number(this.orderForm.value.paid) || 0;

    this.totalprice = price * qty;
    this.finalprice = this.totalprice - (this.totalprice * discount / 100);
    this.due = this.finalprice - paid;

    this.orderForm.patchValue({ due: this.due }, { emitEvent: false });
  }

  onFocusLost(): void {
    this.PriceCalculation();
  }

  addOrder(): void {
    if (this.orderForm.invalid) {
      alert('Please fill in all required fields.');
      return;
    }

    const order: OrderModel = { ...this.orderForm.value };
    const salesTracking: SalestrackingModel = {
  id: '', // or generate a UUID if needed
  orderId: '', // optionally, link this to your saved order's ID
   status: 'Pending'
  
};

    this.orderService.saveOrder(order).subscribe({
      next: (res) => {
        alert("Order saved successfully.");
        this.orderForm.reset();
        this.router.navigate(['/viewallorder']);
        this.loadOrders();
      },
      error: (error) => {
        console.error("Error saving order", error);
      }
    });

    this.sts.saveST(salesTracking).subscribe({
      next: (res) => console.log("Sales tracking saved:", res),
      error: (err) => console.error("Error saving sales tracking", err)
    });
  }

  printInvoice() {
    const element = document.getElementById('invoiceToPrint');
    if (!element) {
      console.error("Invoice element not found.");
      return;
    }

    element.style.display = 'block'; // Show element before printing

    setTimeout(() => {
      html2canvas(element).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`${this.orderForm.value.customername || 'invoice'}.pdf`);

        element.style.display = 'none';
      });
    }, 300);
  }
}
