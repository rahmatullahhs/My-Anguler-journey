import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viewallcustomer',
  standalone: false,
  templateUrl: './viewallcustomer.html',
  styleUrl: './viewallcustomer.css'
})
export class Viewallcustomer implements OnInit {

customer:any;

constructor(private customerservice : CustomerService,
  private router: Router,
    private cdr: ChangeDetectorRef
){}

  ngOnInit(): void {
this.loadAllCustomer();
  }

loadAllCustomer():void{
this.customer=this.customerservice.getAllCustomer();
}

viewAllCustomer(){
this.customer=this.customerservice.getAllCustomer();
}

deleteCustomer(id:string):void{
this.customerservice.deleteCustomer(id).subscribe({

 next: (res) => {
        console.log(res);
        this.cdr.reattach();
        this.viewAllCustomer();
      },
      error: (error) => {
        console.log(error);
      },
});
}

updateCustomer(id:string){
this.router.navigate(['updatecustomer',id]);
}

}
