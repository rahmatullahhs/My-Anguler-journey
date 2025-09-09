import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-replace-unit.component',
  standalone: false,
  templateUrl: './add-replace-unit.component.html',
  styleUrl: './add-replace-unit.component.css'
})
export class AddReplaceUnitComponent {
  replaceForm: FormGroup;
  submitted = false;
  successMessage = '';
  errorMessage = '';

  constructor(private fb: FormBuilder) {
    this.replaceForm = this.fb.group({
      originalUnitId: ['', Validators.required],
      replacementUnitId: ['', Validators.required],
      reason: ['', Validators.required],
      date: [new Date().toISOString().split('T')[0], Validators.required],
      technician: ['', Validators.required]
    });
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.replaceForm.invalid) {
      this.errorMessage = 'Please fill in all fields correctly.';
      this.successMessage = '';
      return;
    }

    // Simulate success
    console.log('Replacement Unit Data:', this.replaceForm.value);
    this.successMessage = 'Replacement unit added successfully!';
    this.errorMessage = '';

    // Optionally reset form
    this.replaceForm.reset();
    this.submitted = false;
  }
}






