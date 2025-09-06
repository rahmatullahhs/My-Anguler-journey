import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { InvoiceModel } from '../../../models/products/invoice.model';
import { InvoiceService } from '../../../service/sale-product/invoice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viewinvoice.component',
  standalone: false,
  templateUrl: './viewinvoice.component.html',
  styleUrl: './viewinvoice.component.css'
})
export class ViewinvoiceComponent implements OnInit{

  invoices: any[] = [];
    loading = false;

searchTerm: string = ''; // 🔍 Search input binding
error: any;

  constructor(
    private invoiceService: InvoiceService,
    private router: Router,
    public cdr:ChangeDetectorRef
  ) {}

  ngOnInit(): void {
      this.loading = true;
    this.loadAllInvoices();
  }

  loadAllInvoices(): void {
 this.invoiceService.getAllInvoice().subscribe({
      next: res => {
        this.cdr.markForCheck();
        this.invoices = Array.isArray(res) ? res : res?.data || [];
          this.loading = false;
      },
        error: err => {
        console.error('Failed to load invoice:', err);
        this.invoices = [];
          this.loading = false;
      }
    });
  }

get filteredInvoice() {
    const term = this.searchTerm.toLowerCase();
    return this.invoices.filter(inv =>
      inv.name?.toLowerCase().includes(term) ||
      inv.invoice?.toLowerCase().includes(term) ||
      inv.email?.toLowerCase().includes(term) ||
      inv.data?.toLowerCase().includes(term)
    );
  }

  deleteInvoice(id: number): void {
    if (confirm('Are you sure you want to delete this invoice?')) {
      this.invoiceService.deleteInvoice(id).subscribe({
        next: () => {
          this.loadAllInvoices();
        },
        error: err => {
          console.error('Error deleting invoice:', err);
        }
      });
    }
  }
}