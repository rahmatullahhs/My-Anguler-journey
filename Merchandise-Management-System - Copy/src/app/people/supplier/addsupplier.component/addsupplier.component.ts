import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SupplierService } from '../../../service/mankind/supplier.service';
import { Router } from '@angular/router';
import { SupplierModel } from '../../../models/human/supplier.model';

@Component({
  selector: 'app-addsupplier.component',
  standalone: false,
  templateUrl: './addsupplier.component.html',
  styleUrl: './addsupplier.component.css'
})

export class AddsupplierComponent implements OnInit {
  formGroup!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private supplierService: SupplierService,
    private router: Router,
    public cdr:ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      name: [''],
      contactPerson: [''],
      phone: ['', Validators.required],
      email: [''],
      address: [''],
      companyName: ['']
    });
  }

  addSupplier(): void {
    if (this.formGroup.invalid) return;

    const supplier: SupplierModel = { ...this.formGroup.value };

    this.supplierService.addSupplier(supplier).subscribe({
      next: (res) => {
        console.log('Supplier Saved:', res);
      
        this.formGroup.reset();
        this.router.navigate(['/viewsupplier']); 
          this.cdr.markForCheck();// Adjust route as needed
      },
      error: (error) => {
        console.error('Error saving supplier:', error);
      }
    });
  }
}

