import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResellStockModel } from '../../../models/ReturnProduct/resellstock.model';
import { ReinvoiceService } from '../../../service/ReturnProduct/reinvoice.service';
import { ResellStockService } from '../../../service/ReturnProduct/resell-stock.service';
import { Router } from '@angular/router';
import { ReinvoiceModel } from '../../../models/ReturnProduct/reinvoice.model';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-addreinvoice',
  standalone: false,
  templateUrl: './addreinvoice.component.html',
  styleUrls: ['./addreinvoice.component.css']
})
export class AddreinvoiceComponent implements OnInit {

  invoiceForm!: FormGroup;
  resellStockModel: ResellStockModel[] = [];
  availableQty: number = 0;
  originalQty: number = 0;
  selectedProductId: number | null = null;

  totalprice = 0;
  finalprice = 0;
  due = 0;

  constructor(
    private reinvoiceService: ReinvoiceService,
    private resellStockService: ResellStockService,
    private formBuilder: FormBuilder,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}


  ngOnInit(): void {
  this.invoiceForm = this.formBuilder.group({
    invoiceNumber: ['', Validators.required],
    date: ['', Validators.required],
    name: ['', Validators.required],
    phone: ['', Validators.required],
    email: [''],
    address: [''],
    productdetail: ['', Validators.required],
    productqty: [null, [Validators.required, Validators.min(1)]],
    price: [''],
    discount: [0],
    paid: [0],
    due: [0],
    createdBy: ['']
  });

  this.loadAllInventory();

  // ✅ Product selection listener
  this.invoiceForm.get('productdetail')?.valueChanges.subscribe(pid => {
    const selectedProduct = this.resellStockModel.find(p => p.id === pid);

    if (selectedProduct) {
      this.selectedProductId = selectedProduct.id;
      this.originalQty = selectedProduct.qty;
      this.availableQty = selectedProduct.qty;

      this.invoiceForm.patchValue({
        price: selectedProduct.price,
        productqty: selectedProduct.qty > 0 ? 1 : null
      }, { emitEvent: false });

      this.calculatePrice();
    } else {
      this.selectedProductId = null;
      this.originalQty = 0;
      this.availableQty = 0;

      this.invoiceForm.patchValue({
        price: '',
        productqty: null
      }, { emitEvent: false });
    }
  });

  // ✅ Quantity change listener (moved outside)
  this.invoiceForm.get('productqty')?.valueChanges.subscribe(qty => {
    const price = this.invoiceForm.get('price')?.value;
    const available = this.availableQty;

    if (qty > available) {
      this.invoiceForm.patchValue({ productqty: available }, { emitEvent: false });
      qty = available;
    }

    if (qty && price) {
      this.calculatePrice();
    }
  });

  // ✅ Discount or Paid change listener
  this.invoiceForm.get('discount')?.valueChanges.subscribe(() => this.calculatePrice());
  this.invoiceForm.get('paid')?.valueChanges.subscribe(() => this.calculatePrice());
}

  // ngOnInit(): void {
  //   this.invoiceForm = this.formBuilder.group({
  //     invoiceNumber: ['', Validators.required],
  //     date: ['', Validators.required],
  //     name: ['', Validators.required],
  //     phone: ['', Validators.required],
  //     email: [''],
  //     address: [''],
  //     productdetail: ['', Validators.required],
  //     productqty: [null, [Validators.required, Validators.min(1)]],
  //     price: [''],
  //     discount: [0],
  //     paid: [0],
  //     due: [0],
  //     createdBy: [''] 
  //   });

  //   this.loadAllInventory();

  //   // Product selection listener
  //   this.invoiceForm.get('productdetail')?.valueChanges.subscribe(pid => {
  //     const selectedProduct = this.resellStockModel.find(p => p.id === pid);

  //     if (selectedProduct) {
  //       this.selectedProductId = selectedProduct.id;
  //       this.originalQty = selectedProduct.qty;
  //       this.availableQty = selectedProduct.qty;

  //       this.invoiceForm.patchValue({
  //         price: selectedProduct.price,
  //         productqty: selectedProduct.qty > 0 ? 1 : null
  //       }, { emitEvent: false });

  //       this.calculatePrice();
  //     } else {
  //       this.selectedProductId = null;
  //       this.originalQty = 0;
  //       this.availableQty = 0;

  //       this.invoiceForm.patchValue({
  //         price: '',
  //         productqty: null
  //       });
  //     }
  //   });
  // }

  loadAllInventory(): void {
    this.resellStockService.getAllResellstock().subscribe(data => {
      this.resellStockModel = data;
      console.log(data,"data");
      this.cdr.markForCheck();
    });
  }

  calculatePrice(): void {
    const { price, productqty, discount, paid } = this.invoiceForm.value;

    const unitPrice = Number(price) || 0;
    const qty = Number(productqty) || 0;
    const disc = Number(discount) || 0;
    const paidAmt = Number(paid) || 0;

    this.totalprice = unitPrice * qty;
    this.finalprice = this.totalprice - (this.totalprice * disc / 100);
    this.due = this.finalprice - paidAmt;

    this.invoiceForm.patchValue({ due: this.due }, { emitEvent: false });

    this.availableQty = this.originalQty - qty;
  }

  onFocusLost(): void {
    this.calculatePrice();
  }

  addReinvoice(): void {
    if (this.invoiceForm.invalid) {
      alert('❌ Please fill all required fields.');
      return;
    }

    this.calculatePrice();
    const f = this.invoiceForm.getRawValue(); // ✅ get all fields including disabled

    if (f.productqty > this.originalQty) {
      alert('❌ Cannot order more than available stock.');
      return;
    }

    const reinvoiceModel: ReinvoiceModel = {
      invoiceNumber: f.invoiceNumber,
      date: f.date,
      name: f.name,
      phone: f.phone,
      email: f.email,
      address: f.address,
      productdetail: f.productdetail,
      productqty: Number(f.productqty),
      price: Number(f.price),
      discount: Number(f.discount),
      paid: Number(f.paid),
      total: this.finalprice,
      due: this.due,
      createdBy: f.createdBy 
    };

    this.reinvoiceService.saveReInvoice(reinvoiceModel).subscribe({
      next: _res => {
        alert('✅ Invoice saved successfully.');
        this.updateInventoryQty(f.productdetail, f.productqty);
        this.invoiceForm.reset();
        this.availableQty = 0;
        this.originalQty = 0;
        this.router.navigate(['/viewallorder']);
      },
      error: err => console.error('❌ Failed to save invoice', err)
    });
  }

  updateInventoryQty(productId: number, soldQty: number): void {
    const product = this.resellStockModel.find(p => p.id === productId);
    if (!product) return;

    const newQty = product.qty - soldQty;
    if (newQty < 0) {
      alert('❌ Not enough stock.');
      return;
    }

    const updated: ResellStockModel = { ...product, qty: newQty };

    this.resellStockService.updateResellstock(product.id!, updated).subscribe({
      next: () => this.loadAllInventory(),
      error: err => console.error('❌ Inventory update failed', err)
    });
  }

  printInvoice(): void {
    const el = document.getElementById('invoiceToPrint');
    if (!el) return;

    el.style.display = 'block';

    setTimeout(() => {
      html2canvas(el).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`${this.invoiceForm.value.name || 'invoice'}.pdf`);

        el.style.display = 'none';
      });
    }, 300);
  }

  getProductNameById(productId: number): string {
    const product = this.resellStockModel.find(p => p.id === productId);
    return product ? product.name : 'Unknown';
  }
}
