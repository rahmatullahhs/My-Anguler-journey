// view-return-product.component.ts

import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ReturnproductModel } from '../../../models/ReturnProduct/returnproduct.model';
import { ReturnProductService } from '../../../service/ReturnProduct/return-product.service';
import { ToastrService } from 'ngx-toastr';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
   standalone:false,
  selector: 'app-view-return-product.component',
  templateUrl: './view-return-product.component.html',
  styleUrls: ['./view-return-product.component.css']
})
export class ViewReturnProductComponent implements OnInit {
  returnProducts: ReturnproductModel[] = [];
  errorMessage = '';
  loading = false;

  constructor(
    private returnProductService: ReturnProductService,
    private toastr: ToastrService,
    private cdr:ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.fetchReturnProducts();
  }

  fetchReturnProducts(): void {
    this.loading = true;
    this.returnProductService.getAllReturnProduct().subscribe({
      next: (data) => {
        this.returnProducts = data;
        this.loading = false;
          this.cdr.markForCheck();
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Failed to load return products.';
        this.loading = false;
      }
    });
  }

  onImageError(event: any) {
    event.target.src = 'https://via.placeholder.com/100x100?text=No+Image';
  }

  deleteReturnProduct(id: number): void {
    if (confirm('Are you sure you want to delete this item?')) {
      this.returnProductService.deleteReturnProduct(id).subscribe({
        next: () => {
          this.toastr.success('Return product deleted.');
          this.fetchReturnProducts();
          this.cdr.markForCheck();
        },
        error: (err) => {
          console.error(err);
          this.toastr.error('Failed to delete return product.');
        }
      });
    }
  }

  markFixed(id: number): void {
    if (!id) { return; }
    this.returnProductService.markProductAsFixed(id).subscribe({
      next: (rp) => {
        this.toastr.success('Product marked as fixed and moved to resell stock.');
        // Update status locally
        const product = this.returnProducts.find(p => p.id === id);
        if (product) {
          product.status = 'FIXED';
        }
      },
      error: (err) => {
        console.error('Failed to mark product as fixed', err);
        this.toastr.error('Failed to mark product as fixed.');
      }
    });
  }

  generatePDF(): void {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text('Return Products Report', 14, 15);

    const headers = [['ID', 'Invoice', 'Type', 'Quantity', 'Date', 'Reason', 'Product Name', 'Status']];
    const data = this.returnProducts.map(product => [
      product.id,
      product.invoice,
      product.type,
      product.quantity,
      new Date(product.date).toLocaleDateString(),
      product.reason,
      product.productName,
      product.status || 'N/A',
      product.price
    ]);

    autoTable(doc, {
      startY: 20,
      head: headers,
      body: data,
      styles: { fontSize: 9 }
    });

    doc.save('return-products.pdf');
  }
}
