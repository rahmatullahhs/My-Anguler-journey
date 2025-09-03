import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartService } from '../../../service/sale-product/cart.service';
import { ProductService } from '../../../service/sale-product/product.service';
import { InvoiceService } from '../../../service/sale-product/invoice.service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

import { ProductModel } from '../../../models/products/product.model';
import { InvoiceModel } from '../../../models/products/invoice.model';
import { Router } from '@angular/router';
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
  invoiceForm: FormGroup;
  product: ProductModel[] = [];

  constructor(
    private invoiceService: InvoiceService,
    private productService: ProductService,
    private cdr: ChangeDetectorRef,
    private cartService: CartService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.invoiceForm = this.fb.group({
      invoiceNumber: [''],
      date: [new Date().toISOString().slice(0, 19)],
      customerName: [''],
      customerPhone: [''],
      customerAddress: [''],
      customerEmail: [''],
      subtotal: [],
      discount: [],
      taxRate: [5],
      taxAmount: [],
      total: [],
      paid: [],
      due: [],
      createdBy: ['']
    });
  }

  ngOnInit(): void {
    const cart = this.cartService.getCart();
    this.cartItems = cart.items || [];
    this.total = cart.total || 0;
    this.invoiceForm.patchValue({ subtotal: this.total });
    this.calculateTotals();

    this.invoiceForm.valueChanges.subscribe(() => {
      this.calculateTotals();
    });
  }

  calculateTotals(): void {
    const subtotal = this.total;
    const discount = this.invoiceForm.value.discount || 0;
    const taxRate = this.invoiceForm.value.taxRate || 0;
    const paid = this.invoiceForm.value.paid || 0;

    const discountedAmount = subtotal - discount;
    const taxAmount = (discountedAmount * taxRate) / 100;
    const finalTotal = discountedAmount + taxAmount;
    const due = finalTotal - paid;

    this.invoiceForm.patchValue({
      subtotal,
      taxAmount,
      total: finalTotal,
      due
    }, { emitEvent: false });
  }




  submitOrder(): void {
    if (this.invoiceForm.invalid) {
      alert('Please fill all required fields correctly.');
      return;
    }

    if (this.cartItems.length === 0) {
      alert('Cart is empty. Please add products.');
      return;
    }

    // Map cart items to products list for backend
    const products = this.cartItems.map(item => ({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      category: item.category,
      brand: item.brand,
      model: item.model,
      details: item.details
    }));

    const orderData: InvoiceModel = {
      ...this.invoiceForm.value,
      products: products,       // send proper products
      date: this.invoiceForm.value.date 
      ? new Date(this.invoiceForm.value.date).toISOString()
      : new Date().toISOString()
    };



    
      // Log the JSON to console
  console.log('Invoice JSON to send:', JSON.stringify(orderData, null, 2));


    this.invoiceService.addInvoice(orderData).subscribe({
      next: (response) => {
        alert('Sale Completed Successfully!');
        this.router.navigate(['/viewinvoice']);
        this.cdr.markForCheck();

        // Clear cart after successful save
        this.cartService.clearCart();
        this.cartItems = [];
        this.total = 0;

        this.invoiceForm.reset({
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
          createdBy: ''
        });
      },
      error: (err) => console.error('Error saving invoice', err)
    });
  }





  // submitOrder(): void {
  //   if (this.invoiceForm.invalid) {
  //     alert('Please fill all required fields correctly.');
  //     return;
  //   }

  //   if (this.cartItems.length === 0) {
  //     alert('Cart is empty. Please add products.');
  //     return;
  //   }

  //   const orderData: InvoiceModel = {
  //     ...this.invoiceForm.value,
  //     items: this.cartItems,
  //     products: {

  //     },
  //     date: '2025-09-01'
  //   };

  //   alert('Sale Completed Successfully!');
  //   this.updateInventory();

  //   this.invoiceService.addInvoice(orderData).subscribe({
  //     next: (response) => {
  //       this.router.navigate(['/viewinvoice']);
  //       this.cdr.markForCheck();
  //     },
  //     error: (err) => console.error('Error saving invoice', err)
  //   });

  //   this.cartService.clearCart();
  //   this.cartItems = [];
  //   this.total = 0;

  //   this.invoiceForm.reset({
  //     invoiceNumber: '',
  //     date: new Date().toISOString().split('T')[0],
  //     customerName: '',
  //     customerPhone: '',
  //     customerAddress: '',
  //     customerEmail: '',
  //     subtotal: 0,
  //     discount: 0,
  //     taxRate: 5,
  //     taxAmount: 0,
  //     total: 0,
  //     paid: 0,
  //     due: 0,
  //     createdBy: ''
  //   });
  // }



  // printInvoice(): void {
  //   const el = document.getElementById('invoiceToPrint');
  //   if (!el) return;

  //   setTimeout(() => {
  //     html2canvas(el).then((canvas) => {
  //       const img = canvas.toDataURL('image/png');
  //       const pdf = new jsPDF('p', 'mm', 'a4');
  //       const w = pdf.internal.pageSize.getWidth();
  //       const h = (canvas.height * w) / canvas.width;
  //       pdf.addImage(img, 'PNG', 0, 0, w, h);
  //       pdf.save(`${this.invoiceForm.value.customerName || 'invoice'}.pdf`);
  //     });
  //   }, 300);
  // }

  printInvoice() {
    const printContents = document.getElementById('invoiceToPrint')?.innerHTML;
    const popupWin = window.open('', '_blank', 'width=800,height=1000');
    if (popupWin && printContents) {
      popupWin.document.open();
      popupWin.document.write(`
      <html>
        <head>
          <title>Invoice</title>
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css">
          <style>
            body {
              font-family: 'Segoe UI', sans-serif;
              padding: 20px;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            .table th, .table td {
              border: 1px solid #dee2e6 !important;
              padding: 8px !important;
            }
            .bg-success {
              background-color: #198754 !important;
              color: #fff !important;
            }
            .text-danger { color: red !important; }
            .text-success { color: green !important; }
            ul.list-group li {
              border: none !important;
              padding: 0.5rem 0 !important;
            }
            @media print {
              body {
                margin: 0;
              }
            }
          </style>
        </head>
        <body onload="window.print(); window.close();">
          ${printContents}
        </body>
      </html>
    `);
      popupWin.document.close();
    }
  }

}
