import { Component } from '@angular/core';
import { CashierService } from '../../service/auth/cashier-service';

@Component({
  selector: 'app-cashier',
  standalone: false,
  templateUrl: './cashier.html',
  styleUrl: './cashier.css'
})
export class Cashier {

  
     // ✅ User fields
        user: any = {
          name: '',
          email: '',
          password: '',
          phone: '',
          photo: '',
          role: 'MANAGER'
        };
      
        // ✅  Cashier fields
        cashier: any = {
          name: '',
          email: '',
          phone: '',
          gender: '',
          address: '',
          dateOfBirth: '',
          photo: ''
        };
      
       
        photoFile: File | null = null;
      
        constructor(private cashierService: CashierService) { }
      
        onFileSelected(event: any) {
          this.photoFile = event.target.files[0];
        }
      
        registerCashier() {
          if (!this.photoFile) {
            alert("Please select a logo/photo before submitting");
            return;
          }
      
          this.cashierService.registerCashier(this.user, this.cashier, this.photoFile)
            .subscribe({
              next: (res) => {
                alert("Cashier registered successfully ✅");
                console.log(res);
              },
              error: (err) => {
                alert("Registration failed ❌");
                console.error(err);
              }
            });
        }
}
