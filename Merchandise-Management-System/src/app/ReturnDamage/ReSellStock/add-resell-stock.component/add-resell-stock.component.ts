import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ResellStockModel } from '../../../models/ReturnProduct/resellstock.model';
import { ResellStockService } from '../../../service/ReturnProduct/resell-stock.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-resell-stock.component',
  standalone: false,
  templateUrl: './add-resell-stock.component.html',
  styleUrl: './add-resell-stock.component.css'
})
export class AddResellStockComponent implements OnInit {


  formGroup!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private resellService: ResellStockService,
    private router: Router,
    public cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      name: [''],
      details: [''],
      qty: [''],
      price: [''],

    });
  }

  addResellStock(): void {
    if (this.formGroup.invalid) return;

    const resellStock: ResellStockModel = { ...this.formGroup.value };

    this.resellService.createResellstock(resellStock).subscribe({
      next: (res) => {
        console.log('resellStock Saved:', res);
        this.formGroup.reset();
        this.router.navigate(['/viewresellstock']);
        this.cdr.markForCheck();// Adjust route as needed
      },
      error: (error) => {
        console.error('Error saving resellStock:', error);
      }
    });
  }
}

