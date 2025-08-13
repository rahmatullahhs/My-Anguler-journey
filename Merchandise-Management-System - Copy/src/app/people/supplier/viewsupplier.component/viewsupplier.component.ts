import { Component, OnInit } from '@angular/core';
import { SupplierModel } from '../../../models/human/supplier.model';
import { SupplierService } from '../../../service/mankind/supplier.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viewsupplier.component',
  standalone: false,
  templateUrl: './viewsupplier.component.html',
  styleUrl: './viewsupplier.component.css'
})
export class ViewsupplierComponent implements OnInit{


  suppliers: SupplierModel[] = [];

  constructor(
    private supplierService: SupplierService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadAllSuppliers();
  }

  loadAllSuppliers(): void {
    this.supplierService.getAllSupplier().subscribe({
      next: res => {
        // Defensive fallback in case of different API structures
        this.suppliers = Array.isArray(res) ? res : res?.data || [];
      },
      error: err => {
        console.error('Failed to load suppliers:', err);
        this.suppliers = [];
      }
    });
  }

  updateSupplier(id: number): void {
    this.router.navigate(['updateSupplier', id]); // Adjust route name if needed
  }

  deleteSupplier(id: number): void {
    if (confirm('Are you sure you want to delete this supplier?')) {
      this.supplierService.deleteSupplier(id).subscribe({
        next: () => {
          this.loadAllSuppliers(); // Refresh list after deletion
        },
        error: err => {
          console.error('Error deleting supplier:', err);
        }
      });
    }
  }
}



