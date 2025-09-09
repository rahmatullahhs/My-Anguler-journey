import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResellStockModel } from '../../../models/ReturnProduct/resellstock.model';

@Component({
  selector: 'app-add-resell-stock.component',
  standalone: false,
  templateUrl: './add-resell-stock.component.html',
  styleUrl: './add-resell-stock.component.css'
})
export class AddResellStockComponent implements OnInit{

  resellForm: FormGroup;
  submitted = false;
  successMessage = '';
  errorMessage = '';
  filteredItems: ResellStockModel[] = [];


  constructor(private fb: FormBuilder) {
   this.resellForm = this.fb.group({
  name: ['', Validators.required],
  details: ['', Validators.required],
  qty: [1, [Validators.required, Validators.min(1)]],
  price: [0, [Validators.required, Validators.min(0.01)]],
  paid: [0, Validators.required],
  date: ['', Validators.required]
});
  }
  ngOnInit(): void {
    
    

  }

  onSubmit(): void {
    this.submitted = true;

    if (this.resellForm.invalid) {
      this.errorMessage = 'Please fill all required fields correctly.';
      return;
    }

    // Simulate success action
    this.successMessage = 'Resell stock added successfully!';
    this.errorMessage = '';

    console.log('Form data:', this.resellForm.value);

    // Reset form after submit
    this.resellForm.reset();
    this.submitted = false;
  }
}


