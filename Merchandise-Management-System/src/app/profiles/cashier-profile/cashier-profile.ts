import { ChangeDetectorRef, Component, OnInit, TemplateRef } from '@angular/core';
import { CashierService } from '../../service/auth/cashier-service';
import { NgIfContext } from '@angular/common';

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
loadingTemplate: TemplateRef<NgIfContext<boolean>> | null | undefined;

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
