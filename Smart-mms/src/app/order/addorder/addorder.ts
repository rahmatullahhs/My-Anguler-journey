import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Router } from '@angular/router';
import { OrderModel } from '../../models/order.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SaletrackingService } from '../../services/saletracking.service';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import { InventoryService } from '../../services/inventory.service';
import { InventoryModel } from '../../models/inventory.model';

@Component({
  standalone:false,
  selector: 'app-addorder',
  templateUrl: './addorder.html',
  styleUrls: ['./addorder.css'] // ✅ Fixed styleUrls
})
export class Addorder implements OnInit {
  orderForm!: FormGroup;
  inventories: InventoryModel[] = [];
  availableQty: number = 0;
  totalprice = 0;
  finalprice = 0;
  due = 0;

  constructor(
    private orderService: OrderService,
    private inventoryService: InventoryService,
    private sts: SaletrackingService,
    private formBuilder: FormBuilder,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.orderForm = this.formBuilder.group({
      invoice: ['', Validators.required],
      date: ['', Validators.required],
      customername: ['', Validators.required],
      customerphone: [''],
      customeremail: [''],
      productdetail: ['', Validators.required],
      productqty: [null, Validators.required],
      price: ['', Validators.required],
      discount: ['0'],
      paid: ['0'],
      due: ['0']
    });

    this.loadAllInventory();

    this.orderForm.get('productdetail')?.valueChanges.subscribe(pid => {
      const inv = this.inventories.find(i => i.id === pid);
      if (inv) {
        this.orderForm.patchValue({ price: inv.price, productqty: 1 });
        this.availableQty = inv.qty;
        this.PriceCalculation();
      } else {
        this.availableQty = 0;
        this.orderForm.patchValue({ price: '', productqty: null });
      }
    });
  }

  loadAllInventory(): void {
    this.inventoryService.getAllInventory().subscribe(data => {
      this.inventories = data;
      this.cdr.markForCheck();
    });
  }

  PriceCalculation(): void {
    const { price, productqty, discount, paid } = this.orderForm.value;
    const p = Number(price) || 0;
    const q = Number(productqty) || 0;
    const d = Number(discount) || 0;
    const pa = Number(paid) || 0;

    this.totalprice = p * q;
    this.finalprice = this.totalprice - (this.totalprice * d / 100);
    this.due = this.finalprice - pa;

    this.orderForm.patchValue({ due: this.due }, { emitEvent: false });
  }

  updateInventoryQty(productId: string, soldQty: number): void {
    const inv = this.inventories.find(i => i.id === productId);
    if (!inv) return;

    const newQty = inv.qty - soldQty;
    if (newQty < 0) {
      alert('❌ Not enough stock available.');
      return;
    }

    const updated: InventoryModel = { ...inv, qty: newQty };
    this.inventoryService.updateInventory(updated).subscribe({
      next: () => {
        console.log(`✅ Stock updated. New qty: ${newQty}`);
        this.loadAllInventory();
      },
      error: err => console.error('❌ Inventory update failed', err)
    });
  }

  addOrder(): void {
    if (this.orderForm.invalid) {
      alert('❌ Please fill required fields.');
      return;
    }

    this.PriceCalculation();

    const f = this.orderForm.value;
    if (f.productqty > this.availableQty) {
      alert('❌ Cannot order more than available stock.');
      return;
    }

    const order: OrderModel = {
      id: '',
      invoice: f.invoice,
      orderDate: f.date,
      customername: f.customername,
      customerphone: f.customerphone,
      customeremail: f.customeremail,
      productdetail: f.productdetail,
      productqty: Number(f.productqty),
      totalAmount: this.finalprice,
      paid: Number(f.paid),
      due: this.due
    };

    this.orderService.saveOrder(order).subscribe({
      next: _res => {
        alert('✅ Order saved');
        this.updateInventoryQty(f.productdetail, Number(f.productqty));
        this.orderForm.reset();
        this.availableQty = 0;
        this.router.navigate(['/viewallorder']);
        this.sts.saveST({ id: '', orderId: '', status: 'Pending' }).subscribe();

      },
      error: err => console.error('❌ Order save failed', err)
    });
  }

  onFocusLost(): void {
    this.PriceCalculation();
  }

  printInvoice(): void {
    const el = document.getElementById('invoiceToPrint');
    if (!el) return;
    el.style.display = 'block';
    setTimeout(() => {
      html2canvas(el).then(canvas => {
        const img = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const w = pdf.internal.pageSize.getWidth();
        const h = (canvas.height * w) / canvas.width;
        pdf.addImage(img, 'PNG', 0, 0, w, h);
        pdf.save(`${this.orderForm.value.customername || 'invoice'}.pdf`);
        el.style.display = 'none';
      });
    }, 300);
  }


}
