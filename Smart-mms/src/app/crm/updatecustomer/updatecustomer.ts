import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CustomerModel } from '../../models/customer.model';
import { CustomerService } from '../../services/customer.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-updatecustomer',
  standalone: false,
  templateUrl: './updatecustomer.html',
  styleUrl: './updatecustomer.css'
})
export class Updatecustomer implements OnInit {
  id!: string;
  customermodel: CustomerModel = new CustomerModel();

  constructor(
    private customerservice: CustomerService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {

    // 
    this.loadAllCustomer();

  }
  loadAllCustomer() {
    this.id = this.activeRoute.snapshot.params['id'];
    this.customerservice.getCustomerById(this.id).subscribe({
      next: (res) => {
        this.customermodel = res;
        this.cdr.markForCheck();

      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  updateCustomer(): void {
    this.customerservice.updateCustomer(this.id, this.customermodel).subscribe({
      next: () => {
        this.router.navigate(['/viewallcustomer'])
      },
      error: (error) => {
        console.log(error);
      }
    });

  }

}
