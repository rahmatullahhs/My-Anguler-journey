import { Component, OnInit } from '@angular/core';
import { BrandService } from '../../../service/buygood/brand.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viewbrand.component',
  standalone: false,
  templateUrl: './viewbrand.component.html',
  styleUrl: './viewbrand.component.css'
})
export class ViewbrandComponent implements OnInit {

brand:any[]=[];

 constructor(
    private brandService: BrandService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadAllBrand();
  }

loadAllBrand(): void {
    this.brandService.getAllBrand().subscribe({
      next: res => {
        // Defensive check and fallback if API structure is dynamic
        this.brand = Array.isArray(res) ? res : [];
      },
      error: err => {
        console.error('Failed to load brands:', err);
        this.brand = [];
      }
    });
  }

  updateEmp(id: string): void {
    this.router.navigate(['updateBrand', id]);
  }

 deleteBrand(id: string): void {
    if (confirm('Are you sure you want to delete this brand?')) {
      this.brandService.deleteBrand(id).subscribe({
        next: () => {
          this.loadAllBrand();
        },
        error: err => {
          console.error('Error deleting employee:', err);
        }
      });
    }
  }


}
