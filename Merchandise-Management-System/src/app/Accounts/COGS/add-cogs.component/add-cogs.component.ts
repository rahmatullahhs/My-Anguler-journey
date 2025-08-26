import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CogsModel } from '../../../models/Accounts/cogs.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CogsService } from '../../../service/Accounts/cogs.service';

@Component({
  selector: 'app-add-cogs.component',
  standalone: false,
  templateUrl: './add-cogs.component.html',
  styleUrls: ['./add-cogs.component.css'] // ✅ fixed typo
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
      date:[''],
      tax: [0],
      totalCogs: [0]
    });
  }

  ngOnInit(): void {
    this.getAllCogs();
  }

  getAllCogs() {
    this.cogsService.getAllCogs().subscribe(data => {
      this.cogsList = data;
      this.cdr.markForCheck();
    });
  }

  // Calculate total cost of goods sold
  calculateTotalCogs(): number {
    const {
      productPrice,
      transportFee,
      labourCost,
      packingCost
    } = this.cogsForm.value;

    const tax = productPrice * 0.205;

    this.cogsForm.patchValue({ tax }); // update tax field in form

    return productPrice + transportFee + labourCost + packingCost + tax;
  }

 onSubmit() {
  if (this.cogsForm.valid) {
    const totalCogs = this.calculateTotalCogs();
    const cogs: CogsModel = {
      ...this.cogsForm.value,
      totalCogs: totalCogs
    };

    console.log('Submitting COGS:', cogs);  // <-- Add this to inspect data sent

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

    

  editCogs(cogs: CogsModel) {
    this.cogsForm.patchValue(cogs);
    this.isEditMode = true;
  }

  deleteCogs(id: number) {
    if (id) {
      this.cogsService.deleteCogs(id).subscribe(() => {
        this.getAllCogs();
      });
    }
  }

  resetForm() {
    this.cogsForm.reset();
    this.isEditMode = false;
  }
}
