import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../models/profile/user.model';
import { AuthService } from '../../service/auth/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: false, 
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css']
})
export class Sidebar implements OnInit{
  @Input() collapsed = true;

  toggleSidebar() {
    throw new Error('Method not implemented.');
  }

  isMobile(): boolean {
    return window.innerWidth < 768;
  }
   userRole: string | null = '';
  currentUser: User | null = null;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    // Subscribe to role changes
    this.authService.userRole$.subscribe(role => {
      this.userRole = role;
    });

    // Also initialize with current role (in case of refresh)
    this.userRole = this.authService.getUserRole();
  }




}
