import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ResellStockModel } from '../../../models/ReturnProduct/resellstock.model';
import { ResellStockService } from '../../../service/ReturnProduct/resell-stock.service';

@Component({
  selector: 'app-add-resell-stock.component',
  standalone: false,
  templateUrl: './add-resell-stock.component.html',
  styleUrl: './add-resell-stock.component.css'
})
export class AddResellStockComponent implements OnInit {

  formGroup!: FormGroup;
  isEditMode = false;
  stockId: number | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private resellService: ResellStockService,
    private router: Router,
    private route: ActivatedRoute, // ✅ To get route params
    public cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      name: ['', Validators.required],
      details: [''],
      qty: ['', Validators.required],
      price: ['', Validators.required],
    });

    // ✅ Check if we're editing (route param: id)
    this.stockId = +this.route.snapshot.paramMap.get('id')!;
    if (this.stockId) {
      this.isEditMode = true;
      this.loadResellStock(this.stockId);
    }
  }

  // ✅ Load existing stock item for editing
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

  // ✅ Unified create/update method
  saveResellStock(): void {
    if (this.formGroup.invalid) return;

    const resellStock: ResellStockModel = {
      ...this.formGroup.value,
      id: this.stockId // Include ID only in edit mode
    };

    if (this.isEditMode) {
      this.updateResellStock(resellStock);
    } else {
      this.createResellStock(resellStock);
    }
  }

  // ✅ Create new item
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

  // ✅ Update existing item
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
