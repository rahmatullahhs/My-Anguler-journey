import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CashierService } from '../../service/auth/cashier-service';

@Component({
  selector: 'app-cashier-profile',
  standalone: false,
  templateUrl: './cashier-profile.html',
  styleUrl: './cashier-profile.css'
})
export class CashierProfile implements OnInit{

  
  profile: any = null;
  loading = true;
  error = '';

  imageUrl: string = "http://localhost:8085/images/roleCashier/";

  constructor(private cashierService: CashierService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.getProfile();
  }

  getProfile() {
    this.cashierService.getProfile().subscribe({
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
