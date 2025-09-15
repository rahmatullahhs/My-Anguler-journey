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
  totalprice = 0;
  finalprice = 0;
  due = 0;

  constructor(
    private orderService: ReinvoiceService,
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
      productqty: [null, Validators.required],
      price: [''],
      discount: [0],
      paid: [0],
      due: [0]
    });

    this.loadAllInventory();

    this.invoiceForm.get('productdetail')?.valueChanges.subscribe(pid => {
      const inv = this.resellStockModel.find(i => i.id === pid);
      if (inv) {
        this.invoiceForm.patchValue({ price: inv.price, productqty: 1 });
        this.availableQty = inv.qty;
        this.calculatePrice();
      } else {
        this.availableQty = 0;
        this.invoiceForm.patchValue({ price: '', productqty: null });
      }
    });
  }

  loadAllInventory(): void {
    this.resellStockService.getAllResellstock().subscribe(data => {
      this.resellStockModel = data;
      this.cdr.markForCheck();
    });
  }

  calculatePrice(): void {
    const { price, productqty, discount, paid } = this.invoiceForm.value;
    const p = Number(price) || 0;
    const q = Number(productqty) || 0;
    const d = Number(discount) || 0;
    const pa = Number(paid) || 0;

    this.totalprice = p * q;
    this.finalprice = this.totalprice - (this.totalprice * d / 100);
    this.due = this.finalprice - pa;

    this.invoiceForm.patchValue({ due: this.due }, { emitEvent: false });
  }

  updateInventoryQty(productId: number, soldQty: number): void {
    const inv = this.resellStockModel.find(i => i.id === productId);
    if (!inv) return;

    const newQty = inv.qty - soldQty;
    if (newQty < 0) {
      alert('❌ Not enough stock available.');
      return;
    }

    const updated: ResellStockModel = { ...inv, qty: newQty };

    this.resellStockService.updateResellstock(inv.id!, updated).subscribe({
      next: () => {
        console.log(`✅ Stock updated. New qty: ${newQty}`);
        this.loadAllInventory();
      },
      error: err => console.error('❌ Inventory update failed', err)
    });
  }

  addReinvoice(): void {
    if (this.invoiceForm.invalid) {
      alert('❌ Please fill required fields.');
      return;
    }

    this.calculatePrice();

    const f = this.invoiceForm.value;

    if (f.productqty > this.availableQty) {
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
      discount: Number(f.discount),
      paid: Number(f.paid),
      total: this.finalprice,
      due: this.due,
      createdBy: 'admin' // Replace with auth logic if needed
    };

    this.orderService.saveReInvoice(reinvoiceModel).subscribe({
      next: _res => {
        alert('✅ Invoice saved');
        this.updateInventoryQty(f.productdetail, Number(f.productqty));
        this.invoiceForm.reset();
        this.availableQty = 0;
        this.router.navigate(['/viewallorder']);
      },
      error: err => console.error('❌ Invoice save failed', err)
    });
  }

  onFocusLost(): void {
    this.calculatePrice();
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
  const product = this.resellStockModel.find(item => item.id === productId);
  return product ? product.name : 'Unknown';
}

}
