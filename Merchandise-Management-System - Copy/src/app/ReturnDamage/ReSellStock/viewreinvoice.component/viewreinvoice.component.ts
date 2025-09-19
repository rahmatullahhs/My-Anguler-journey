import { Component, OnInit } from '@angular/core';
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

  constructor(private reinvoiceService: ReinvoiceService) {}

  ngOnInit(): void {
    this.loadInvoices();
  }

  loadInvoices(): void {
    this.reinvoiceService.getAllReInvoice().subscribe({
      next: (data) => {
        this.reinvoices = data;
      },
      error: (err) => {
        console.error('Failed to fetch invoices:', err);
      }
    });
  }

  getProductNameById(productId: number): string {
    // If you want to display product name, you might need ResellStockService or pass it from backend
    return `Product ID: ${productId}`; // Placeholder
  }

  printInvoice(invoice: ReinvoiceModel): void {
    // Optional: You can implement print for each invoice here or redirect to AddreinvoiceComponent with data
    console.log('Print invoice:', invoice);
  }
}


