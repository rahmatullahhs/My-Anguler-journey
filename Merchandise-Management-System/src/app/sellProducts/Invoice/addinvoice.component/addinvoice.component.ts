import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CartService } from '../../../service/sale-product/cart.service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-addinvoice.component',
  standalone: false,
  templateUrl: './addinvoice.component.html',
  styleUrl: './addinvoice.component.css'
})
export class AddinvoiceComponent {
 cartItems: any[] = [];
  total: number = 0;

  orderForm!: FormGroup;

  constructor(
    private cartService: CartService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    const cart = this.cartService.getCart();
    this.cartItems = cart.items || [];
    this.total = cart.total || 0;

    this.orderForm = this.fb.group({
      invoiceNumber: [''],
      date: [new Date().toISOString().split('T')[0]], // default to today
      paid: [0],
      due: [0],

      customerName: [''],
      customerPhone: [''],
      customerAddress: [''],
      customerEmail: [''],

      subtotal: [this.total],
      discount: [0],
      taxRate: [5],
      taxAmount: [0],
      total: [this.total],

      creatBy: [''],
    });

    this.calculateTotals();
  }

  calculateTotals(): void {
    const subtotal = this.total;
    const discount = this.orderForm.value.discount || 0;
    const taxRate = this.orderForm.value.taxRate || 0;

    const discountedAmount = subtotal - discount;
    const taxAmount = (discountedAmount * taxRate) / 100;
    const finalTotal = discountedAmount + taxAmount;

    this.orderForm.patchValue({
      subtotal: subtotal,
      taxAmount: taxAmount,
      total: finalTotal,
      due: finalTotal - (this.orderForm.value.paid || 0)
    });
  }

  onPaidChange(): void {
    const paid = this.orderForm.value.paid || 0;
    const total = this.orderForm.value.total || 0;
    this.orderForm.patchValue({
      due: total - paid
    });
  }

  submitOrder(): void {
    if (this.orderForm.valid) {
      const orderData = this.orderForm.value;
      console.log('Submitting order:', orderData);
      // Submit to backend or service
    } else {
      console.log('Order form is invalid.');
    }
  }

  printInvoice(): void {
    const el = document.getElementById('invoiceToPrint');
    if (!el) return;

    el.style.display = 'block';

    setTimeout(() => {
      html2canvas(el).then((canvas: { toDataURL: (arg0: string) => any; height: number; width: number; }) => {
        const img = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const w = pdf.internal.pageSize.getWidth();
        const h = (canvas.height * w) / canvas.width;
        pdf.addImage(img, 'PNG', 0, 0, w, h);
        pdf.save(`${this.orderForm.value.customerName || 'invoice'}.pdf`);
        el.style.display = 'none';
      });
    }, 300);
  }
}
