import { Component, OnInit } from '@angular/core';
import { ReturnproductModel } from '../../../models/ReturnProduct/returnproduct.model';
import { ReturnProductService } from '../../../service/ReturnProduct/return-product.service';

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
}

