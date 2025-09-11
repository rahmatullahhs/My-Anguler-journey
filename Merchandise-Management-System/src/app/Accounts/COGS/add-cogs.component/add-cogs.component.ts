
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CogsService } from '../../../service/Accounts/cogs.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CogsModel } from '../../../models/Accounts/cogs.model';


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
      date: [''],
      purchaseInvoice: ['', Validators.required],
      productName: ['', Validators.required],
      productQty: [0, [Validators.required, Validators.min(1)]],
      productPrice: [0, Validators.required],
      transportFee: [0, Validators.required],
      labourCost: [0, Validators.required],
      packingCost: [0, Validators.required],
      tax: [0],
      totalCogs: [0],
      eachProductPrice: [0]
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

  calculateTotalCogs() {
    const {
      productPrice,
      transportFee,
      labourCost,
      packingCost,
      productQty
    } = this.cogsForm.value;

    const cif = productPrice + transportFee + labourCost + packingCost;
    const tax = cif * 0.205;
    const totalCogs = cif + tax;
    const eachProductPrice = productQty > 0 ? totalCogs / productQty : 0;

    this.cogsForm.patchValue({
      tax: tax,
      totalCogs: totalCogs,
      eachProductPrice: eachProductPrice
    });
  }

  onSubmit() {
    if (this.cogsForm.valid) {
      this.calculateTotalCogs();

      const cogs: CogsModel = {
        ...this.cogsForm.value
      };

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
