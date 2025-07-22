import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InventoryModel } from '../../models/inventory.model';
import { InventoryService } from '../../services/inventory.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-addinventory',
  standalone: false,
  templateUrl: './addinventory.html',
  styleUrls: ['./addinventory.css'] // 
})
export class Addinventory implements OnInit {

  inventoryForm: FormGroup;
  editing: boolean = false;
  inventory: InventoryModel[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private inventoryService: InventoryService
  ) {
    this.inventoryForm = this.formBuilder.group({
      id: [null],  // Optional
      productname: ['', Validators.required],
      productDetails: [''],
      price: [0, [Validators.required, Validators.min(0)]],
      qty: [1, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    this.loadInventory();
  }

  loadInventory(): void {
    this.inventoryService.getAllInventory().subscribe(res => {
      this.inventory = res;
    });
  }

  onSubmit(): void {
    if (!this.inventoryForm.valid) {
      alert('Please fill in required fields.');
      return;
    }

    const formValue = this.inventoryForm.value;

    if (this.editing && formValue.id) {
      // UPDATE PRODUCT
      this.inventoryService.updateInventory(formValue).subscribe(() => {
        alert('Product updated successfully!');
        this.loadInventory();
        this.cancelEdit();
      });
    } else {
      // CREATE PRODUCT
      const newInventory: InventoryModel = { ...formValue };
      this.inventoryService.addInventory(newInventory).subscribe(() => {
        alert('Product added successfully!');
        this.loadInventory();
        this.inventoryForm.reset();
        this.router.navigate(['/viewinventory']);
      });
    }
  }

  editInventory(inventory: InventoryModel): void {
    this.editing = true;
    this.inventoryForm.patchValue(inventory);  
  }

  deleteInventory(id: string): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.inventoryService.deleteInventory(id).subscribe(() => {
        alert('Product deleted!');
        this.loadInventory();
      });
    }
  }

  cancelEdit(): void {
    this.editing = false;
    this.inventoryForm.reset({
      id: null,
      productname: '',
      productDetails: '',
      price: 0,
      qty: 1
    });
  }
}
