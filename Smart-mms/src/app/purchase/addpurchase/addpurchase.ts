import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PurchaseService } from '../../services/purchase.model';
import { BrandService } from '../../services/brand.service';
import { BrandModel } from '../../models/brand.model';
import { PurchaseModel } from '../../models/purchase.model';

@Component({
  selector: 'app-addpurchase',
  standalone: false,
  templateUrl: './addpurchase.html',
  styleUrl: './addpurchase.css'
})
export class Addpurchase  implements OnInit{
  purchase!: any;
  purchaseForm: FormGroup;
  editing: boolean = false;

  brands: BrandModel[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private purchaseservice: PurchaseService,
    private brandService: BrandService
  ) {
    this.purchaseForm = this.formBuilder.group({
      id: [null],  // In case you use it for edit
      name: ['', Validators.required],
      graphicscard: [''],
      monitor: [''],
      processor: [''],
      ram: [''],
      storage: [''],
      price: [0],
      stock_qty: [0],
       brandId: [null, Validators.required]  // Store ID!
    });
  }

  ngOnInit(): void {
    this.loadPurchase();
    this.loadBrands();
  }

  loadPurchase(): void {
    this.purchase = this.purchaseservice.getAllPurchase();
  }

  loadBrands(): void {
    this.brandService.getAllBrand().subscribe({
      next: (res) => {
        this.brands = res;
      },
      error: (err) => {
        console.error('Error loading brands:', err);
      }
    });
  }

  onSubmit() {
  if (this.purchaseForm.valid) {
    const purchase: PurchaseModel = this.purchaseForm.value;

    if (this.editing && purchase.id) {
      // UPDATE
      this.purchaseservice.updatePurchase(purchase).subscribe(() => {
        alert('Product updated successfully!');
        this.loadPurchase();
      
      });
    } else {
      // CREATE
      const newPurchase: PurchaseModel = {
        name: purchase.name,
        processor: purchase.processor,
        ram: purchase.ram,
        storage: purchase.storage,
        graphicscard: purchase.graphicscard,
        monitor: purchase.monitor,
        price: purchase.price,
        stock_qty: purchase.stock_qty,
        brandId: purchase.brandId 
      };
      this.purchaseservice.addPurchase(newPurchase).subscribe(() => {
        alert('Product added successfully!')
        this.purchaseForm.reset();
      });
    }
  } else {
    alert('Please fill in required fields.');
  }
}



  getBrandName(brandId: string): string {
    return this.brands.find(b => b.id === brandId)?.name || 'N/A';
  }

  
}


