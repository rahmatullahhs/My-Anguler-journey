import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CustomerModel } from '../../../models/human/customer.model';
import { CustomerService } from '../../../service/mankind/customer.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-updatecustomer.component',
  standalone: false,
  templateUrl: './updatecustomer.component.html',
  styleUrl: './updatecustomer.component.css'
})
export class UpdatecustomerComponent implements OnInit{

  id!: number;
  customer!: CustomerModel;

  constructor(
    private customerService: CustomerService,
    public router: Router,
    private activeRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadCustomer();
  }

  loadCustomer(): void {
    this.id = this.activeRoute.snapshot.params['id'];

    this.customerService.getCustomerById(Number(this.id)).subscribe({
      next: (res) => {
        this.customer = res;
        console.log(res)
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Error loading customer:', error);
      }
    });
  }

  updateCustomer(): void {
    this.customerService.updateCustomer(Number(this.id), this.customer).subscribe({
      next: () => {
        this.router.navigate(['/viewcustomer']);
      },
      error: (error) => {
        console.error('Error updating customer:', error);
      }
    });
  }
}


