import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../../service/mankind/customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viewcustomer.component',
  standalone: false,
  templateUrl: './viewcustomer.component.html',
  styleUrl: './viewcustomer.component.css'
})
export class ViewcustomerComponent implements OnInit {

  customers: any[] = [];

  constructor(
    private customerService: CustomerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadAllCustomers();
  }

  loadAllCustomers(): void {
    this.customerService.getAllCustomer().subscribe({
      next: res => {
        // Defensive check and fallback if API structure is dynamic
        this.customers = Array.isArray(res) ? res : res?.data || [];
      },
      error: err => {
        console.error('Failed to load customers:', err);
        this.customers = [];
      }
    });
  }

  updateCustomer(id: number): void {
    this.router.navigate(['updateCustomer', id]);
  }

  deleteCustomer(id: number): void {
    if (confirm('Are you sure you want to delete this customer?')) {
      this.customerService.deleteCustomer(id).subscribe({
        next: () => {
          this.loadAllCustomers();
        },
        error: err => {
          console.error('Error deleting customer:', err);
        }
      });
    }
  }
}


