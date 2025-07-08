import { Component, OnInit } from '@angular/core';
import { ProductModel } from '../../models/product.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-addproduct',
  standalone: false,
  templateUrl: './addproduct.html',
  styleUrl: './addproduct.css'
})
export class Addproduct implements OnInit {
  product: ProductModel[] = [];
  psForm: FormGroup;
  editing: boolean = false;

  constructor(
    private fb: FormBuilder,
    private productservice: ProductService
  ) {
    this.psForm = this.fb.group({
      id: [''], // JSON Server uses number
      name: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadproduct();
  }

  loadproduct() {
    this.productservice.getAll().subscribe(data => {
      this.product = data;
    });
  }

  onSubmit() {
    if (this.psForm.invalid) return;

    if (this.editing) {
      this.productservice.update(this.psForm.value).subscribe(() => {
        alert('Updated successfully!');
        this.loadproduct();
        this.cancelEdit();
      });
    } else {
      const { name } = this.psForm.value; // ⬅️ Only send the name
      this.productservice.add({ name }).subscribe(() => {
        alert('Added successfully!');
        this.loadproduct();
        this.psForm.reset();
        this.editing = false;
      });
    }
  }

  

  editProduct(ps: ProductService) {
    this.editing = true;
    this.psForm.patchValue({
      id: ps.id;
      name: ps.name;
      brand: ps.brand;
      processor: ps.processor;
      ram: ps.ram;
      storage: ps.storage;
      price: ps.price;
      stock_qty: ps.stock_qty;
    });
  }

  deleteProduct(id: string) {
    if (confirm('Are you sure?')) {
      this.productservice.delete(id).subscribe(() => {
        alert('Deleted!');
        this.loadproduct();
      });
    }
  }

  cancelEdit() {
    this.editing = false;
    this.psForm.reset();
  }
}

