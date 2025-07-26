import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserModel } from '../../models/user.model';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';
import { Userservice } from '../../services/userservice';

@Component({
  selector: 'app-userprofile',
  standalone: false,
  templateUrl: './userprofile.html',
  styleUrl: './userprofile.css'
})
export class Userprofile {

 user: UserModel | null = null;
  private subscription: Subscription = new Subscription();

  constructor(
    private authService: AuthService, 
    private router: Router,
    private userSer: Userservice
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


