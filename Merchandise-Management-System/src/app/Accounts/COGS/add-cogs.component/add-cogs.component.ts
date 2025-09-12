import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CogsService } from '../../../service/Accounts/cogs.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CogsModel } from '../../../models/Accounts/cogs.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-cogs.component',
  standalone: false,
  templateUrl: './add-cogs.component.html',
  styleUrls: ['./add-cogs.component.css']
})
export class AddCogsComponent implements OnInit {
  

  cogsForm: FormGroup;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private cogsService: CogsService,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef
  ) {
    this.cogsForm = this.fb.group({
      id: [null],
      date: [this.getTodayDate()],
      purchaseInvoice: ['', Validators.required],
      productName: ['', Validators.required],
      productQty: [0, [Validators.required, Validators.min(1)]],
      productCost: [0, Validators.required],
      transportFee: [0, Validators.required],
      labourCost: [0, Validators.required],
      packingCost: [0, Validators.required],
      tax: [0],
      totalCogs: [0],
      eachProductPrice: [0]
    });
  }

  ngOnInit(): void {
    const navigation = history.state;
    if (navigation?.cogsData) {
      this.isEditMode = true;
      this.cogsForm.patchValue(navigation.cogsData);
    }

    this.watchFormForCalculations();
  }

  /** Auto calculation watcher on key fields */
  watchFormForCalculations(): void {
    const fieldsToWatch = [
      'productCost',
      'transportFee',
      'labourCost',
      'packingCost',
      'productQty'
    ];

    fieldsToWatch.forEach(field => {
      this.cogsForm.get(field)?.valueChanges.subscribe(() => {
        this.calculateTotalCogs();
      });
    });
  }

  /** Calculate tax, total COGS, and each product price */
  calculateTotalCogs(): void {
    const {
      productCost,
      transportFee,
      labourCost,
      packingCost,
      productQty
    } = this.cogsForm.value;

    const cif = Number(productCost) + Number(transportFee) + Number(labourCost) + Number(packingCost);
    const tax = cif * 0.205;
    const totalCogs = cif + tax;
    const eachProductPrice = productQty > 0 ? totalCogs / productQty : 0;

    this.cogsForm.patchValue({
      tax: +tax.toFixed(2),
      totalCogs: +totalCogs.toFixed(2),
      eachProductPrice: +eachProductPrice.toFixed(2)
    }, { emitEvent: false });
  }

  /** Submit logic with validation and mode check */
  onSubmit(): void {
    if (this.cogsForm.invalid) {
      this.cogsForm.markAllAsTouched();
      this.toastr.warning('Please fill in all required fields.');
      return;
    }

    this.calculateTotalCogs();

    const cogs: CogsModel = {
      ...this.cogsForm.value
    };

    if (this.isEditMode && cogs.id) {
      this.cogsService.updateCogs(cogs).subscribe({
        next: () => {
          this.toastr.success('COGS updated successfully!');
          this.resetForm();
        },
        error: () => {
          this.toastr.error('Failed to update COGS!');
        }
      });
    } else {
      this.cogsService.addCogs(cogs).subscribe({
        next: () => {
          this.toastr.success('COGS added successfully!');
          this.resetForm();
        },
        error: () => {
          this.toastr.error('Failed to add COGS!');
        }
      });
    }
  }

  /** Reset the form to initial state */
  resetForm(): void {
    this.cogsForm.reset({
      id: null,
      date: this.getTodayDate(),
      purchaseInvoice: '',
      productName: '',
      productQty: 0,
      productCost: 0,
      transportFee: 0,
      labourCost: 0,
      packingCost: 0,
      tax: 0,
      totalCogs: 0,
      eachProductPrice: 0
    });
    this.isEditMode = false;
  }

  /** Utility to return today’s date as yyyy-mm-dd */
  private getTodayDate(): string {
    return new Date().toISOString().substring(0, 10);
  }

}
