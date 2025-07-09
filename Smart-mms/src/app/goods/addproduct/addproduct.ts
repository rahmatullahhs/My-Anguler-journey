import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ProductModel } from "../../models/product.model";
import { ProductService } from "../../services/product.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: 'app-addproduct',
  standalone: false,
  templateUrl: './addproduct.html',
  styleUrls: ['./addproduct.css']
})
export class AddProduct implements OnInit {
  products: ProductModel[] = [];
  psForm: FormGroup;
  editing: boolean = false;

  constructor(
    private fb: FormBuilder,
    private productservice: ProductService
  ) {
    this.psForm = this.fb.group({
      id: [null],
      category:['',],
      name: ['', Validators.required],
      brand: [''],
      processor: [''],
      ram: [''],
      storage: [''],
      price: [0],
      stock_qty: [0]
    });
  }

  ngOnInit(): void {
    this.loadproduct();
  }

  loadproduct(): void {
    this.productservice.getAll().subscribe(data => {
      this.products = data;
    });
  }

  onSubmit(): void {
    if (this.psForm.invalid) return;

    if (this.editing) {
      this.productservice.update(this.psForm.value).subscribe(() => {
        alert('Updated successfully!');
        this.loadproduct();
        this.cancelEdit();
      });
    } else {
      const newProduct: ProductModel = this.psForm.value;
      this.productservice.add(newProduct).subscribe(() => {
        alert('Added successfully!');
        this.loadproduct();
        this.psForm.reset();
        this.editing = false;
      });
    }
  }

  editProduct(ps: ProductModel): void {
    this.editing = true;
    this.psForm.patchValue(ps);
  }

  deleteProduct(id: string): void {
    if (confirm('Are you sure?')) {
      this.productservice.delete(id).subscribe(() => {
        alert('Deleted!');
        this.loadproduct();
      });
    }
  }

  cancelEdit(): void {
    this.editing = false;
    this.psForm.reset({
      id: null,
      name: '',
      brand: '',
      processor: '',
      ram: '',
      storage: '',
      price: 0,
      stock_qty: 0
    });
  }
}
