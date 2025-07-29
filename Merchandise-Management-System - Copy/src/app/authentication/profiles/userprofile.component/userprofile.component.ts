import { Component } from '@angular/core';
import { UserModel } from '../../../models/profile/user.model';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../service/auth/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../../../service/auth/user.service';

@Component({
  selector: 'app-userprofile.component',
  standalone: false,
  templateUrl: './userprofile.component.html',
  styleUrl: './userprofile.component.css'
})
export class UserprofileComponent {

  user: UserModel | null = null;
  private subscription: Subscription = new Subscription();

  constructor(
    private authService: AuthService, 
    private router: Router,
    private userSer: UserService
  ) { }

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser(): void{
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

