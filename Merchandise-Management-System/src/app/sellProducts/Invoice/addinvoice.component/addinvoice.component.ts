import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartService } from '../../../service/sale-product/cart.service';
import { ProductService } from '../../../service/sale-product/product.service';
import { InvoiceService } from '../../../service/sale-product/invoice.service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { CartModel } from '../../../models/products/cart.model';
import { ProductModel } from '../../../models/products/product.model';
import { InvoiceModel } from '../../../models/products/invoice.model';
import { Route, Router } from '@angular/router';

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
      date: [new Date().toISOString().split('T')[0]],
      customerName: ['', Validators.required],
      customerPhone: ['', Validators.required],
      customerAddress: ['', Validators.required],
      customerEmail: ['', [Validators.required, Validators.email]],
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

  updateInventory(): void {
    for (const item of this.cartItems) {
      const updatedProduct: ProductModel = {
        ...item.product,
        quantity: item.product.quantity - item.quantity
      };
      this.invoiceService.updateInventory(item.product.id, item.quantity, updatedProduct)
        .subscribe({
          next: () => console.log(`✅ Updated inventory for product ${item.product.name}`),
          error: (err) => console.error('❌ Inventory update failed', err)
        });
    }
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

    const orderData: InvoiceModel = {
      ...this.invoiceForm.value,
      items: this.cartItems
    };

    console.log('✅ Order Submitted:', orderData);
    alert('Sale Completed Successfully!');

    // 1. Reduce inventory
    this.updateInventory();

    // 2. Submit invoice
    this.invoiceService.addInvoice(orderData).subscribe({
      next: (response) => {
        console.log('✅ Invoice saved successfully!', response);
        this.router.navigate(['/viewinvoice']);
        this.cdr.markForCheck();
      },
      error: (err) => console.error('❌ Error saving invoice', err)
    });

    // 3. Clear cart
    this.cartService.clearCart();
    this.cartItems = [];
    this.total = 0;

    // 4. Reset form
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
        pdf.save(`${this.invoiceForm.value.customerName || 'invoice'}.pdf`);
        el.style.display = 'none';
      });
    }, 300);
  }
}
