import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ResellStockModel } from '../../../models/ReturnProduct/resellstock.model';
import { ResellStockService } from '../../../service/ReturnProduct/resell-stock.service';

@Component({
  selector: 'app-add-resell-stock.component',
  standalone: false,
  templateUrl: './add-resell-stock.component.html',
  styleUrls: ['./add-resell-stock.component.css']
})
export class AddResellStockComponent implements OnInit {

  formGroup!: FormGroup;
  isEditMode = false;
  stockId: number | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private resellService: ResellStockService,
    private router: Router,
    private route: ActivatedRoute,
    public cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      name: ['', Validators.required],
      details: [''],
      qty: ['', [Validators.required, Validators.min(1)]],
      price: ['', [Validators.required, Validators.min(0)]],
    });

    // Check if editing
    const idParam = this.route.snapshot.paramMap.get('id');
    this.stockId = idParam ? +idParam : null;

    if (this.stockId) {
      this.isEditMode = true;
      this.loadResellStock(this.stockId);
    }
  }

  // Load existing stock item
  loadResellStock(id: number): void {
    this.resellService.getResellstockById(id).subscribe({
      next: (data) => {
        this.formGroup.patchValue(data);
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Error loading stock item:', err);
      }
    });
  }

  // Unified save method
  saveResellStock(): void {
    if (this.formGroup.invalid) return;

    const resellStock: ResellStockModel = {
      ...this.formGroup.value
    };

    if (this.isEditMode) {
      this.updateResellStock(resellStock);
    } else {
      this.createResellStock(resellStock);
    }
  }

  // Create
  createResellStock(resellStock: ResellStockModel): void {
    this.resellService.createResellstock(resellStock).subscribe({
      next: () => {
        this.router.navigate(['/viewresellstock']);
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Error creating resellStock:', error);
      }
    });
  }

  // Update
  updateResellStock(resellStock: ResellStockModel): void {
    this.resellService.updateResellstock(this.stockId!, resellStock).subscribe({
      next: () => {
        this.router.navigate(['/viewresellstock']);
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Error updating resellStock:', error);
      }
    });
  }
}
