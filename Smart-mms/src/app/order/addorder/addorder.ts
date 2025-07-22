import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { OrderService } from '../../services/order.service';
import { Router } from '@angular/router';
import { OrderModel } from '../../models/order.model';

@Component({
  selector: 'app-addorder',
  standalone: false,
  templateUrl: './addorder.html',
  styleUrl: './addorder.css'
})
export class Addorder implements OnInit{
 formGroup !: FormGroup;


  constructor(
    private orderService: OrderService,
    private formBuilder: FormBuilder,
    private router: Router,
  
    private cdr: ChangeDetectorRef

  ) { }


  ngOnInit(): void {

    this.formGroup = this.formBuilder.group({

      
     id:[''],
    invoice:[''],
    date:Date,
    customername:[''],
    customerphone:[''],
    customeremail:[''],
    productdetail:[''],
    productqty:[''],
    price:[''],
    paid:[''],
    due:['']

    
    });


  }



  addOrder(): void {
    if (this.formGroup.invalid) {
      return; // Don't submit invalid form
    }

    const order: OrderModel = { ...this.formGroup.value };

    this.orderService.saveOrder(order).subscribe({
      next: (res) => {
        console.log("order Saved", res);
    
        this.formGroup.reset();
       // this.cdr.reattach(); // or reattach() if that's correct for you
        this.router.navigate(['/viewallorder']);
      },
      error: (error) => {
        console.error("Error saving order", error);
        // Optionally show an error message to the user
      }
    });
  }


}
