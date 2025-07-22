import { Component, OnInit } from '@angular/core';
import { LedgerbookModel } from '../../models/ledgerbook.model';
import { ProductModel } from '../../models/product.model';
import { LedgerbookService } from '../../services/ledgerbook.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-ledgerbook',
  standalone: false,
  templateUrl: './ledgerbook.html',
  styleUrl: './ledgerbook.css'
})
export class Ledgerbook implements OnInit{

  ledgerEntries: LedgerbookModel[] = [];
  products: ProductModel[] = [];

  constructor(
    private ledgerbookService: LedgerbookService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.loadLedgerEntries();
    this.loadProducts();
  }

  loadLedgerEntries(): void {
    this.ledgerbookService.getAll().subscribe({
      next: (entries) => this.ledgerEntries = entries,
      error: (err) => console.error('Error loading ledger entries:', err)
    });
  }

  loadProducts(): void {
    this.productService.getAll().subscribe({
      next: (products) => this.products = products,
      error: (err) => console.error('Error loading products:', err)
    });
  }

  getProductName(productId: string): string {
    return this.products.find(p => p.id === productId)?.name || 'N/A';
  }
}

  

