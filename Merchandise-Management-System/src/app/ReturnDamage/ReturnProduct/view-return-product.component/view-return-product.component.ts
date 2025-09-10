import { Component, OnInit } from '@angular/core';
import { ReturnproductModel } from '../../../models/ReturnProduct/returnproduct.model';
import { ReturnProductService } from '../../../service/ReturnProduct/return-product.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';


@Component({
  selector: 'app-view-return-product.component',
  standalone: false,
  templateUrl: './view-return-product.component.html',
  styleUrl: './view-return-product.component.css'
})
export class ViewReturnProductComponent implements OnInit {
 

  returnProducts: ReturnproductModel[] = [];
  errorMessage = '';
  loading = false;

  constructor(private returnProductService: ReturnProductService) {}

  ngOnInit(): void {
    this.fetchReturnProducts();
  }

  fetchReturnProducts(): void {
    this.loading = true;
    this.returnProductService.getAllReturnProduct().subscribe({
      next: (data) => {
        this.returnProducts = data;
        this.loading = false;
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

  // Optional: Delete functionality
  deleteReturnProduct(id: number): void {
    if (confirm('Are you sure you want to delete this item?')) {
      this.returnProductService.deleteReturnProduct(id).subscribe({
        next: () => this.fetchReturnProducts(),
        error: (err) => {
          console.error(err);
          this.errorMessage = 'Failed to delete return product.';
        }
      });
    }
  }

  

markFixed(id: number) {
  console.log(`markFixed called with id: ${id}`);

  // Find the product by id and update status locally
  const product = this.returnProducts.find(p => p.id === id);
  if (product) {
    product.status = 'FIXED';

    // Optionally, call your service to persist this change on backend
    this.returnProductService.markProductAsFixed(id).subscribe({
      next: () => {
        console.log(`Product ${id} marked as fixed on server.`);
      },
      error: (err) => {
        console.error('Failed to mark product as fixed', err);
        // revert local change on error
      
      }
    });
  }
}


generatePDF(): void {
  const doc = new jsPDF();

  // Title
  doc.setFontSize(16);
  doc.text('Return Products Report', 14, 15);

  // Table data
  const headers = [['ID', 'Invoice', 'Type', 'Quantity', 'Date', 'Reason', 'Product Name', 'Status']];
  const data = this.returnProducts.map(product => [
    product.id,
    product.invoice,
    product.type,
    product.quantity,
    new Date(product.date).toLocaleDateString(),
    product.reason,
    product.productName,
    product.status || 'N/A'
  ]);

  // Generate table
  autoTable(doc, {
    startY: 20,
    head: headers,
    body: data,
    styles: { fontSize: 9 }
  });

  // Save PDF
  doc.save('return-products.pdf');
}




}

