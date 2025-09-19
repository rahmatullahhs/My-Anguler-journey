import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ReinvoiceModel } from '../../../models/ReturnProduct/reinvoice.model';
import { ReinvoiceService } from '../../../service/ReturnProduct/reinvoice.service';

@Component({
  selector: 'app-viewreinvoice.component',
  standalone: false,
  templateUrl: './viewreinvoice.component.html',
  styleUrl: './viewreinvoice.component.css'
})
export class ViewreinvoiceComponent implements OnInit{
  reinvoices: ReinvoiceModel[] = [];

  constructor(
    private reinvoiceService: ReinvoiceService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadInvoices();
  }

  loadInvoices(): void {
    this.reinvoiceService.getAllReInvoice().subscribe({
      next: (data) => {
        console.log('API Response:', data);
        this.reinvoices = data.data || data; // handle both formats
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Failed to fetch invoices:', err);
      }
    });
  }

  printInvoice(invoice: ReinvoiceModel): void {
    // For now, just logs to console — you can enhance this later
    console.log('Printing invoice:', invoice);

    // Optional: Open a new window to print
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Invoice #${invoice.invoiceNumber}</title>
          </head>
          <body>
            <h2>Invoice #${invoice.invoiceNumber}</h2>
            <p><strong>Name:</strong> ${invoice.name}</p>
            <p><strong>Date:</strong> ${invoice.date}</p>
            <p><strong>Product:</strong> ${invoice.productdetail}</p>
            <p><strong>Quantity:</strong> ${invoice.productqty}</p>
            <p><strong>Price:</strong> ${invoice.price}</p>
            <p><strong>Total:</strong> ${invoice.total}</p>
            <p><strong>Paid:</strong> ${invoice.paid}</p>
            <p><strong>Due:</strong> ${invoice.due}</p>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  }

  deleteInvoice(id: number): void {
    if (confirm(`Are you sure you want to delete invoice #${id}?`)) {
      this.reinvoiceService.deleteReInvoice(id).subscribe({
        next: () => {
          // Remove the deleted invoice from the local array
          this.reinvoices = this.reinvoices.filter(inv => inv.id !== id);
          console.log(`Invoice #${id} deleted successfully`);
          this.cdr.markForCheck();
        },
        error: (err) => {
          console.error('Failed to delete invoice:', err);
        }
      });
    }
  }

  getProductNameById(productId: number): string {
    return `Product ID: ${productId}`; // You can replace this with actual product name logic
  }
}


