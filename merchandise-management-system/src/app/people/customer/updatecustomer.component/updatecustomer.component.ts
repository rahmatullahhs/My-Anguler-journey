import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../../../service/mankind/customer.service';
import { CustomerModel } from '../../../models/human/customer.model';

@Component({
  selector: 'app-updatecustomer.component',
  standalone: false,
  templateUrl: './updatecustomer.component.html',
  styleUrls: ['./updatecustomer.component.css'] // ✅ fixed styleUrl → styleUrls
})
export class UpdatecustomerComponent implements OnInit {
  customerForm!: FormGroup;
  customerId!: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.customerId = this.route.snapshot.paramMap.get('id') || '';
    if (!this.customerId) {
      alert('No customer ID provided.');
      this.router.navigate(['/viewcustomers']);
      return;
    }

    this.customerForm = this.formBuilder.group({
      id: [this.customerId],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: ['']
    });

    this.loadCustomer();
  }

  loadCustomer(): void {
    this.customerService.getCustomerById(this.customerId).subscribe({
      next: (customer: CustomerModel) => {
        this.customerForm.patchValue(customer);
      },
      error: err => {
        console.error('Failed to load customer:', err);
        alert('Could not load customer.');
        this.router.navigate(['/viewcustomers']);
      }
    });
  }

  onSubmit(): void {
    if (this.customerForm.invalid) {
      alert('Please correct the form.');
      return;
    }

    const updatedCustomer: CustomerModel = this.customerForm.value;

    this.customerService.updateCustomer(this.customerId, updatedCustomer).subscribe({
      next: () => {
        alert('Customer updated successfully!');
        this.router.navigate(['/viewcustomers']);
      },
      error: err => {
        console.error('Failed to update customer:', err);
        alert('Update failed.');
      }
    });
  }
}

