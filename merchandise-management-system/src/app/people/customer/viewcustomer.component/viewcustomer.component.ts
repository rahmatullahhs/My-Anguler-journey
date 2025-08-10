import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '../../../service/mankind/customer.service';
import { CustomerModel } from '../../../models/human/customer.model';

@Component({
  selector: 'app-viewcustomer.component',
  standalone: false,
  templateUrl: './viewcustomer.component.html',
  styleUrls: ['./viewcustomer.component.css']
})
export class ViewcustomerComponent implements OnInit {
  customers: CustomerModel[] = [];
  isLoading = false;
  error = '';

  constructor(
    private customerService: CustomerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.isLoading = true;
    this.customerService.getAllCustomers().subscribe({
      next: data => {
        this.customers = data;
        this.isLoading = false;
      },
      error: err => {
        console.error('Error loading customers:', err);
        this.error = 'Failed to load customers.';
        this.isLoading = false;
      }
    });
  }

  deleteCustomer(id: string): void {
    if (confirm('Are you sure you want to delete this customer?')) {
      this.customerService.deleteCustomer(id).subscribe({
        next: () => {
          alert('Customer deleted successfully.');
          this.loadCustomers();
        },
        error: err => {
          console.error('Error deleting customer:', err);
          alert('Failed to delete customer.');
        }
      });
    }
  }

  editCustomer(id: string): void {
    this.router.navigate(['/updatecustomer', id]); // Adjust route as per your routing setup
  }

  viewCustomer(id: string): void {
    this.router.navigate(['/customerdetails', id]); // Adjust route as needed
  }

  getInitials(name: string): string {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  }
}
