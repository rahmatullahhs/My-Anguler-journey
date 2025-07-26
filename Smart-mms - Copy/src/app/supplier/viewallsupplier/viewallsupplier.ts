import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SupplierService } from '../../services/supplier.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viewallsupplier',
  standalone: false,
  templateUrl: './viewallsupplier.html',
  styleUrl: './viewallsupplier.css'
})
export class Viewallsupplier implements OnInit {
 


supplier:any;

constructor(private supplierService: SupplierService,
  private router: Router,
    private cdr: ChangeDetectorRef
){}


  ngOnInit(): void {
    this.loadAllSupplier();
  }

loadAllSupplier():void{
this.supplier=this.supplierService.getAllSupplier();
}

  viewAllSupplier() {
    this.supplier = this.supplierService.getAllSupplier();
  }

  deleteSupplier(id: string): void {
    this.supplierService.deleteSupplier(id).subscribe({
      next: (res) => {
        console.log(res);
        this.cdr.reattach();
        this.viewAllSupplier();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  updateSupplier(id: string){
    this.router.navigate(['updatesupplier', id]);
  }
}





