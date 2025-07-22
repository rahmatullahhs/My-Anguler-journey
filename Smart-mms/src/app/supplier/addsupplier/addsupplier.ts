import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SupplierService } from '../../services/supplier.service';
import { Router } from '@angular/router';
import { SupplierModel } from '../../models/supplier.model';



@Component({

  selector: 'app-addsupplier',
   standalone: false,
  templateUrl: './addsupplier.html',
  styleUrls: ['./addsupplier.css'] // ✅ Fixed typo: "styleUrl" ➝ "styleUrls"
})
export class Addsupplier implements OnInit {
  supplierForm: FormGroup;
  isEditMode = false;

  constructor(
    private supplierservice: SupplierService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    // ✅ Build form with validation (optional)
    this.supplierForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      address: ['']
    });
  }

  ngOnInit(): void {
    // ✅ No need to rebuild the form here again — already built in constructor
  }

  addsupplier(): void {
    const supplier: SupplierModel = this.supplierForm.value;
    this.supplierservice.saveSupplier(supplier).subscribe({
      next: () => {
        this.router.navigate(['viewallsupplier']);
      },
      error: (error) => {
        console.error('Error saving supplier:', error);
      }
    });
  }
}
