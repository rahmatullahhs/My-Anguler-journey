import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartService } from '../../../service/sale-product/cart.service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { CartModel } from '../../../models/products/cart.model';

@Component({
  selector: 'app-addinvoice.component',
  standalone: false,
  templateUrl: './addinvoice.component.html',
  styleUrls: ['./addinvoice.component.css']
})
export class AddinvoiceComponent implements OnInit {

  cartItems: CartModel[] = [];
  total = 0;
  orderForm: FormGroup;

  constructor(
    private cartService: CartService,
    private fb: FormBuilder
  ) {
    this.orderForm = this.fb.group({
      invoiceNumber: [''],
      date: [new Date().toISOString().split('T')[0]],
      customerName: ['', Validators.required],
      customerPhone: ['', Validators.required],
      customerAddress: ['', Validators.required],
      customerEmail: ['', [Validators.required, Validators.email]],
      subtotal: [0],
      discount: [0],
      taxRate: [5],
      taxAmount: [0],
      total: [0],
      paid: [0],
      due: [0],
      creatBy: ['']
    });
  }

  ngOnInit(): void {
    const cart = this.cartService.getCart();
    this.cartItems = cart.items || [];
    this.total = cart.total || 0;

    this.orderForm.patchValue({ subtotal: this.total });
    this.calculateTotals();

    this.orderForm.valueChanges.subscribe(() => {
      this.calculateTotals();
    });
  }

  calculateTotals(): void {
    const subtotal = this.total;
    const discount = this.orderForm.value.discount || 0;
    const taxRate = this.orderForm.value.taxRate || 0;
    const paid = this.orderForm.value.paid || 0;

    const discountedAmount = subtotal - discount;
    const taxAmount = (discountedAmount * taxRate) / 100;
    const finalTotal = discountedAmount + taxAmount;
    const due = finalTotal - paid;

    this.orderForm.patchValue({
      subtotal: subtotal,
      taxAmount: taxAmount,
      total: finalTotal,
      due: due
    }, { emitEvent: false });
  }

  submitOrder(): void {
    if (this.orderForm.invalid) {
      alert('Please fill all required fields correctly.');
      return;
    }

    if (this.cartItems.length === 0) {
      alert('Cart is empty. Please add products.');
      return;
    }

    const orderData = {
      ...this.orderForm.value,
      items: this.cartItems
    };

    console.log('✅ Order Submitted:', orderData);
    alert('Sale Completed Successfully!');

    // TODO: Submit orderData to backend here

    this.cartService.clearCart();
    this.cartItems = [];
    this.total = 0;

    this.orderForm.reset({
      invoiceNumber: '',
      date: new Date().toISOString().split('T')[0],
      customerName: '',
      customerPhone: '',
      customerAddress: '',
      customerEmail: '',
      subtotal: 0,
      discount: 0,
      taxRate: 5,
      taxAmount: 0,
      total: 0,
      paid: 0,
      due: 0,
      creatBy: ''
    });
  }

  printInvoice(): void {
    const el = document.getElementById('invoiceToPrint');
    if (!el) return;

    el.style.display = 'block';

    setTimeout(() => {
      html2canvas(el).then((canvas) => {
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
