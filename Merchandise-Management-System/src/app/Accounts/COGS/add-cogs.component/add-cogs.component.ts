import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CogsModel } from '../../../models/Accounts/cogs.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CogsService } from '../../../service/Accounts/cogs.service';

@Component({
  selector: 'app-add-cogs',
  standalone: false,
  templateUrl: './add-cogs.component.html',
  styleUrls: ['./add-cogs.component.css']
})
export class AddCogsComponent implements OnInit {
  cogsList: CogsModel[] = [];
  cogsForm: FormGroup;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private cogsService: CogsService,
    private cdr: ChangeDetectorRef
  ) {
    this.cogsForm = this.fb.group({
      id: [null],
      purchaseInvoice: ['', Validators.required],
      productName: ['', Validators.required],
      productPrice: [0, Validators.required],
      transportFee: [0, Validators.required],
      labourCost: [0, Validators.required],
      packingCost: [0, Validators.required],
      date: [''],
      quantity: [0, Validators.required], // Added quantity field
      tax: [0],
      totalCogs: [0],
      productPricePerUnit: [0] // New field to store price per unit calculation
    });
  }

  ngOnInit(): void {
    this.getAllCogs();
  }

  // Fetch all COGS records from service
  getAllCogs() {
    this.cogsService.getAllCogs().subscribe(data => {
      this.cogsList = data;
      this.cdr.markForCheck();
    });
  }

  // Calculate the total cost of goods sold (COGS)
  calculateTotalCogs(): number {
    const {
      productPrice,
      transportFee,
      labourCost,
      packingCost,
      quantity
    } = this.cogsForm.value;

    const tax = productPrice * 0.205;

    // Update the tax field in form
    this.cogsForm.patchValue({ tax });

    // Calculate total COGS (product cost + transport + labor + packing + tax)
    const totalCogs = (productPrice + transportFee + labourCost + packingCost + tax) * quantity;

    // Update totalCogs in the form
    this.cogsForm.patchValue({ totalCogs });

    return totalCogs;
  }

  // Calculate price per unit
  calculatePricePerUnit() {
    const { totalCogs, quantity } = this.cogsForm.value;

    // Avoid division by zero
    if (quantity > 0) {
      return totalCogs / quantity;
    } else {
      return 0;
    }
  }

  // Submit form for adding/updating COGS entry
  onSubmit() {
    if (this.cogsForm.valid) {
      const totalCogs = this.calculateTotalCogs();
      const cogs: CogsModel = {
        ...this.cogsForm.value,
        totalCogs: totalCogs
      };

      console.log('Submitting COGS:', cogs);  // <-- Inspect data sent

      if (this.isEditMode && cogs.id) {
        this.cogsService.updateCogs(cogs).subscribe(() => {
          this.getAllCogs();
          this.resetForm();
        });
      } else {
        this.cogsService.addCogs(cogs).subscribe(() => {
          this.getAllCogs();
          this.resetForm();
        });
      }
    }
  }

  // Edit COGS entry
  editCogs(cogs: CogsModel) {
    this.cogsForm.patchValue(cogs);
    this.isEditMode = true;
  }

  // Delete COGS entry
  deleteCogs(id: number) {
    if (id) {
      this.cogsService.deleteCogs(id).subscribe(() => {
        this.getAllCogs();
      });
    }
  }

  // Reset the form and form state
  resetForm() {
    this.cogsForm.reset();
    this.isEditMode = false;
    this.cogsForm.patchValue({
      productPrice: 0,
      transportFee: 0,
      labourCost: 0,
      packingCost: 0,
      quantity: 0,
      tax: 0,
      totalCogs: 0,
      productPricePerUnit: 0
    });
  }

  // Handle quantity change to update price per unit
  onQuantityChange() {
    this.calculatePricePerUnit(); // Recalculate unit price when quantity changes
  }
}
