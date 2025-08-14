import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BrandModel } from '../../../models/goods/brand.model';
import { BrandService } from '../../../service/buygood/brand.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-updatebrand.component',
  standalone: false,
  templateUrl: './updatebrand.component.html',
  styleUrl: './updatebrand.component.css'
})
export class UpdatebrandComponent implements OnInit {
  id!: string;
  brand!: BrandModel;

  constructor(
    private brandService: BrandService,
    public router: Router,
    private activeRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadBrand();
  }

  // Loads the brand by ID
  loadBrand(): void {
    this.id = this.activeRoute.snapshot.params['id'];

    this.brandService.getBrandById(this.id).subscribe({
      next: (res) => {
        this.brand = res;
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Error loading brand:', error);
      }
    });
  }

  // Updates the brand
  updateBrand(): void {
    this.brandService.updateBrand(this.brand).subscribe({
      next: () => {
        this.router.navigate(['/viewallbrand']);
      },
      error: (error) => {
        console.error('Error updating brand:', error);
      }
    });
  }
}
