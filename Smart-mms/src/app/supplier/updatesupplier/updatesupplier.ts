import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SupplierModel } from '../../models/supplier.model';
import { SupplierService } from '../../services/supplier.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-updatesupplier',
  standalone: false,
  templateUrl: './updatesupplier.html',
  styleUrl: './updatesupplier.css'
})
export class Updatesupplier  implements OnInit {

  id!: string;
  supplier: SupplierModel = {} as SupplierModel;


  constructor(
    private supplierService: SupplierService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) { }



  ngOnInit(): void {
   
    // this.id = this.activeRoute.snapshot.params['id'];
    this.loadAllSupplier();

  }






  loadAllSupplier(): void {
      this.id = this.activeRoute.snapshot.params['id'];

    this.supplierService.getSupplierById(this.id).subscribe({
      next: (res) => {
        this.supplier = res;
        this.cdr.markForCheck();
        
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  updateEmp():void {
    this.supplierService.updateSupplier(this.id, this.supplier).subscribe({
      next: () => {
        this.router.navigate(['/viewallsupplier'])
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  
}


