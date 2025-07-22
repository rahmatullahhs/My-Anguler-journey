import { Component, OnInit } from '@angular/core';
import { Userservice } from '../../services/userservice';
import { Subscription } from 'rxjs';
import { UserModel } from '../../models/user.model';

@Component({
  selector: 'app-admin-profile',
  standalone: false,
  templateUrl: './admin-profile.html',
  styleUrl: './admin-profile.css'
})
export class AdminProfile implements OnInit {
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
