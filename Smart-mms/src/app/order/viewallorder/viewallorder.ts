import { Component, OnInit } from '@angular/core';
import { OrderModel } from '../../models/order.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { OrderService } from '../../services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viewallorder',
  standalone: false,
  templateUrl: './viewallorder.html',
  styleUrl: './viewallorder.css'
})
export class Viewallorder implements OnInit{
editing: boolean = false;
orders:OrderModel[]=[];
orderform:FormGroup;
constructor(
private orderService:OrderService,
private router:Router,
private formbuilder:FormBuilder

){

this.orderform=this.formbuilder.group({

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
})
}

ngOnInit():void{
this.loadAllData();

}

loadOrders():void{
this.orderService.getAllOrder().subscribe(res =>{
this.orders=res;
})
}

loadAllData(): void {
    this.orderService.getAllOrder().subscribe(res => {
      this.orders = res;
    });
  }

editOrder(order: OrderModel): void {
    this.editing = true;
    this.orderform.patchValue(order
      
    );
  }

  deleteOrder(id: string): void {
    if (confirm('Are you sure you want to delete this order?')) {
      this.orderService.deleteOrder(id).subscribe(() => {
        alert('order deleted!');
        this.loadOrders();
      });
    }
  }

cancelEdit(): void {
    this.editing = false;
    this.orderform.reset({

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

goToEditOrder(id: string): void {
  this.router.navigate(['/addorder', id]);
}


updateOrder(): void {
  const updateOrder = this.orderform.value;

  if (!updateOrder.id) {
    alert('Invalid order ID.');
    return;
  }

  // Extract the ID and create a model without the ID field (optional, depending on backend)
  const { id, ...orderModel } = updateOrder;

  this.orderService.updateOrder(id, orderModel).subscribe({
    next: () => {
      alert('Order updated successfully!');
      this.loadOrders();
      this.cancelEdit(); // Reset form and exit edit mode
    },
    error: (err) => {
      console.error('Update failed:', err);
      alert('Failed to update order. Please try again.');
    }
  });
}









}
