import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../../../service/mankind/customer.service';
import { Router } from '@angular/router';
import { CustomerModel } from '../../../models/human/customer.model';

@Component({
  selector: 'app-addcustomer.component',
  standalone: false,
  templateUrl: './addcustomer.component.html',
  styleUrl: './addcustomer.component.css'
})
export class AddcustomerComponent implements OnInit{



  formGroup!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private customerService: CustomerService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      id: [null],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      address: ['']
    });
  }

  addCustomer(): void {
    if (this.formGroup.invalid) return;

    const customer: CustomerModel = { ...this.formGroup.value };

    this.customerService.addCustomer(customer).subscribe({
      next: (res) => {
        console.log('Customer Saved:', res);
        this.formGroup.reset();
        this.router.navigate(['/viewCustomer']);
      },
      error: (error) => {
        console.error('Error:', error);
      }
    });
  }
}


