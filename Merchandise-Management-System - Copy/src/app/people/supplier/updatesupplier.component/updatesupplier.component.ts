import { ChangeDetectorRef, Component } from '@angular/core';
import { SupplierModel } from '../../../models/human/supplier.model';
import { SupplierService } from '../../../service/mankind/supplier.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-updatesupplier.component',
  standalone: false,
  templateUrl: './updatesupplier.component.html',
  styleUrl: './updatesupplier.component.css'
})
export class UpdatesupplierComponent {





  id!: number;
  supplier!: SupplierModel;

  constructor(
    private supplierService: SupplierService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadSupplier();
  }

  loadSupplier(): void {
    this.id = this.activeRoute.snapshot.params['id'];

    this.supplierService.getSupplierById(this.id).subscribe({
      next: (res) => {
        this.supplier = res;
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Error loading supplier:', error);
      }
    });
  }

  updateSupplier(): void {
    this.supplierService.updateSupplier(this.id, this.supplier).subscribe({
      next: () => {
        this.router.navigate(['/viewSuppliers']); // Update route if different
      },
      error: (error) => {
        console.error('Error updating supplier:', error);
      }
    });
  }
}





