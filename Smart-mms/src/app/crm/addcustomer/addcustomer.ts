import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CustomerService } from '../../services/customer.service';
import { Router } from '@angular/router';
import { CustomerModel } from '../../models/customer.model';

@Component({
  selector: 'app-addcustomer',
  standalone: false,
  templateUrl: './addcustomer.html',
  styleUrl: './addcustomer.css'
})
export class Addcustomer implements OnInit{

 formGroup !: FormGroup;

constructor( 
private customerservice:CustomerService,
 private formBuilder: FormBuilder,
    private router: Router,

){}

  ngOnInit(): void {
  this.formGroup = this.formBuilder.group({
      name: [''],
      email: [''],
      phone: [''],
      address: ['']

  });
  }

addCustomer():void{

const CustomerModel:CustomerModel ={...this.formGroup.value};
this.customerservice.saveCustomer(CustomerModel).subscribe({

 next: (res) => {
console.log("customer Saved ", res);
        this.formGroup.reset();
        this.router.navigate(['/viewaallcustomer']);

console.log("Student Saved ", res);
        this.formGroup.reset();
        this.router.navigate(['/viewallemp']);

      },

    error: (error) => {

        console.log(error);   


    }





})


}








}
