import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../models/user.model';
import { Subscription } from 'rxjs';
import { Userservice } from '../../services/userservice';

@Component({
  selector: 'app-manager-profile',
  standalone: false,
  templateUrl: './manager-profile.html',
  styleUrl: './manager-profile.css'
})
export class ManagerProfile implements OnInit {
 user: UserModel | null = null;
    private subscription: Subscription = new Subscription();
  
    constructor(
      private userSer: Userservice
    ) { }
    ngOnInit(): void {
      this.loadUser();
    }
  
    loadUser(): void {
      this.userSer.getUserProfile().subscribe({
        next: (data) => {
          this.user = data;
        },
        error: (error) => {
          console.log(error);
        }
      });
    }
}

