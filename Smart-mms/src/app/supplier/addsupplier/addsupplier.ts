import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SupplierService } from '../../services/supplier.service';
import { Router } from '@angular/router';
import { SupplierModel } from '../../models/supplier.model';

@Component({
  selector: 'app-addsupplier',
  standalone: false,
  templateUrl: './addsupplier.html',
  styleUrl: './addsupplier.css'
})
export class Addsupplier implements OnInit {
  supplier: SupplierModel[] = [];
  supplierForm: FormGroup;
  isEditMode = false;

  constructor(
    private supplierservice: SupplierService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {
    this.supplierForm = this.formBuilder.group({
      id: [null],
      name: ['', Validators.required]


    });
  }



  ngOnInit(): void {
    this.supplierForm = this.formBuilder.group({
      name: [''],
      email: [''],
      phone: [''],
      address: ['']

    });
  }


  addsupplier(): void {
    const supplier: SupplierModel = { ...this.supplierForm.value };
    this.supplierservice.saveSupplier(supplier).subscribe({
      next: (res) => {
        this.router.navigate(['viewallsupplier'])
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

// In your component.ts
countries = [
  { code: 'IN', name: 'India' },
  { code: 'US', name: 'United States' },
  { code: 'CA', name: 'Canada' },
  { code: 'DE', name: 'Germany' },
  { code: 'AU', name: 'Australia' },
  // Add more as needed
];

getFlagEmoji(code: string): string {
  return code.toUpperCase().replace(/./g, c => 
    String.fromCodePoint(c.charCodeAt(0) + 127397));
}



}
