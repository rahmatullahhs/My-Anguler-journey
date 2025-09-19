import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AdminService } from '../../service/auth/admin-service';
import { ManagerService } from '../../service/auth/manager-service';

@Component({
  selector: 'app-manager-profile',
  standalone: false,
  templateUrl: './manager-profile.html',
  styleUrl: './manager-profile.css'
})
export class ManagerProfile implements OnInit{

  
  profile: any = null;
  loading = true;
  error = '';

  imageUrl: string = "http://localhost:8085/images/roleManager/";

  constructor(private managerService: ManagerService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.getProfile();
  }

  getProfile() {
    this.managerService.getProfile().subscribe({
      next: (data) => {
        this.profile = data;
        this.cdr.markForCheck();
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load profile ❌';
        console.error(err);
        this.loading = false;
      }
    });
  }
}
