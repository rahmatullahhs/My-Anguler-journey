import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReturnProductService } from '../../../service/ReturnProduct/return-product.service';
import { ReturnproductModel } from '../../../models/ReturnProduct/returnproduct.model';

@Component({
  selector: 'app-add-return-product.component',
  standalone: false,
  templateUrl: './add-return-product.component.html',
  styleUrl: './add-return-product.component.css'
})
export class AddReturnProductComponent implements OnInit {

returnForm!: FormGroup;
  submitted = false;
  successMessage = '';
  errorMessage = '';
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private returnProductService: ReturnProductService
  ) {}

  ngOnInit(): void {
    this.returnForm = this.fb.group({
      invoice: ['', Validators.required],
      type: ['RETURN'], // Default to RETURN
      quantity: [1, [Validators.required, Validators.min(1)]],
      date: [new Date()],
      reason: [''],
      productName: [''],
      photo: [null] // Not used directly
    });
  }

  // Triggered when file is selected
  onFileChange(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  // Submit form
  onSubmit(): void {
    this.submitted = true;

    if (this.returnForm.invalid) {
      return;
    }

    const returnProduct: ReturnproductModel = {
      ...this.returnForm.value,
      photo: undefined // Remove photo as form control if present
    };

    this.returnProductService.createReturnProduct(returnProduct, this.selectedFile?? undefined).subscribe({
      next: () => {
        this.successMessage = 'Return product added successfully!';
        this.errorMessage = '';
        this.returnForm.reset();
        this.selectedFile = null;
        this.submitted = false;
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Failed to add return product.';
        this.successMessage = '';
      }
    });
  }
}


