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

  invoices: InvoiceModel[] = []; // Renamed to match usage

  constructor(
    private invoiceService: InvoiceService,
    private router: Router,
    public cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadInvoices(); // Fetch invoices when the component initializes
  }

  loadInvoices(): void {
    this.invoiceService.getAllInvoice().subscribe({
      next: (data) => {
        this.invoices = data;
        this.cdr.markForCheck(); // Ensure change detection happens
      },
      error: (err) => {
        console.error('Error fetching invoices', err);
      }
    });
  }

  viewInvoice(id: number): void {
    // Navigate to a detailed view page of the selected invoice
    this.router.navigate([`/invoice/${id}`]);
  }

  deleteInvoice(id: number): void {
    // Confirm before deleting
    if (confirm('Are you sure you want to delete this invoice?')) {
      this.invoiceService.deleteInvoice(id).subscribe({
        next: () => {
          this.invoices = this.invoices.filter(invoice => invoice.id !== id); // Remove from the list
          alert('Invoice deleted successfully!');
        },
        error: (err) => {
          console.error('Error deleting invoice', err);
          alert('Failed to delete invoice.');
        }
      });
    }
  }
}
