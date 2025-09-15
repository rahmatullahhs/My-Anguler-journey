import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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

searchTerm:string='';
  suppliers: SupplierModel[] = [];

  constructor(
    private supplierService: SupplierService,
    private router: Router,
    public cdr:ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadAllSuppliers();
  }

  loadAllSuppliers(): void {
  this.supplierService.getAllSupplier().subscribe({
    next: res => {
      this.cdr.markForCheck();
      this.suppliers = res;
    },
    error: err => {
      console.error('Failed to load suppliers:', err);
      this.suppliers = [];
    }
  });
}


    get filteredSupplier() {
    const term = this.searchTerm.toLowerCase();
    return this.suppliers.filter(sup =>
      sup.name?.toLowerCase().includes(term) ||
      sup.companyName?.toLowerCase().includes(term) ||
      sup.email?.toLowerCase().includes(term)||
      sup.phone?.toLowerCase().includes(term)
    );
  }



  updateSupplier(id: number): void {
    this.router.navigate(['updatesupplier',id]); // Adjust route name if needed
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



