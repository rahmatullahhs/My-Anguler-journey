import { Component } from '@angular/core';
import { ManagerService } from '../../service/auth/manager-service';

@Component({
  selector: 'app-manager',
  standalone: false,
  templateUrl: './manager.html',
  styleUrl: './manager.css'
})
export class Manager {

   // ✅ User fields
      user: any = {
        name: '',
        email: '',
        password: '',
        phone: '',
        photo: '',
        role: 'MANAGER'
      };
    
      // ✅  Manager fields
      manager: any = {
        name: '',
        email: '',
        phone: '',
        gender: '',
        address: '',
        dateOfBirth: '',
        photo: ''
      };
    
     
      photoFile: File | null = null;
    
      constructor(private managerService: ManagerService) { }
    
      onFileSelected(event: any) {
        this.photoFile = event.target.files[0];
      }
    
      registerManager() {
        if (!this.photoFile) {
          alert("Please select a logo/photo before submitting");
          return;
        }
    
        this.managerService.registerAdmin(this.user, this.manager, this.photoFile)
          .subscribe({
            next: (res) => {
              alert("Manager registered successfully ✅");
              console.log(res);
            },
            error: (err) => {
              alert("Registration failed ❌");
              console.error(err);
            }
          });
      }
}
