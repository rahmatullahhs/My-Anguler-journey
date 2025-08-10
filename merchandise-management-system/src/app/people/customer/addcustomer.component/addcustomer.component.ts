import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../../../service/mankind/customer.service'; // adjust path if needed
import { CustomerModel } from '../../../models/human/customer.model'; // adjust path if needed
import { Router } from '@angular/router';

@Component({
  selector: 'app-addcustomer.component',
  standalone: false,
  templateUrl: './addcustomer.component.html',
  styleUrls: ['./addcustomer.component.css'] // ✅ fixed styleUrl → styleUrls
})
export class AddcustomerComponent implements OnInit {
  customerForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private customerService: CustomerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.customerForm = this.formBuilder.group({
      id: [null], // Optional if backend generates ID
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: ['']
    });
  }

  onSubmit(): void {
    if (this.customerForm.invalid) {
      alert('Please fill in all required fields correctly.');
      return;
    }

    const newCustomer: CustomerModel = this.customerForm.value;

    this.customerService.addCustomer(newCustomer).subscribe({
      next: () => {
        alert('Customer added successfully!');
        this.customerForm.reset();
        this.router.navigate(['/viewcustomers']); // ✅ Replace with your actual route
      },
      error: err => {
        console.error('Error adding customer:', err);
        alert('Failed to add customer.');
      }
    });
  }
}
