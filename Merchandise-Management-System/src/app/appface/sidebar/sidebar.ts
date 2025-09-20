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

  userRole: string | null = null;
  currentUser: User | null = null;

  constructor(private authService: AuthService) {}
ngOnInit(): void {
  // Subscribe to current user observable
  this.authService.currentUser$.subscribe(user => {
    this.currentUser = user;
  });

  // Subscribe to role observable
  this.authService.userRole$.subscribe(role => {
    this.userRole = role;
  });

  // Optionally fallback (e.g., if using local storage or synchronous role access)
  if (!this.userRole) {
    this.userRole = this.authService.getUserRole();
  }
}

  isMobile(): boolean {
    return window.innerWidth < 768;
  }

  toggleSidebar(): void {
    this.collapsed = !this.collapsed;
  }
}
