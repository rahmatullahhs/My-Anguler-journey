import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GoodModel } from '../../../models/goods/good.model';
import { CategoryModel } from '../../../models/goods/category.model';
import { BrandModel } from '../../../models/goods/brand.model';
import { SupplierModel } from '../../../models/human/supplier.model';
import { ActivatedRoute, Router } from '@angular/router';
import { GoodService } from '../../../service/buygood/good.service';
import { BrandService } from '../../../service/buygood/brand.service';
import { CategoryService } from '../../../service/buygood/category.service';
import { SupplierService } from '../../../service/mankind/supplier.service';

@Component({
  standalone: false,
  selector: 'app-addgood',
  templateUrl: './addgood.component.html',
  styleUrls: ['./addgood.component.css']
})
export class AddgoodComponent implements OnInit {

  goodForm: FormGroup;

  categories: CategoryModel[] = [];
  brands: BrandModel[] = [];
  supplier: SupplierModel[] = [];
  totalprice: number = 0;
  finalprice: number = 0;
  due: number = 0;
  constructor(
    private formBuilder: FormBuilder,
    private goodService: GoodService,
    private brandService: BrandService,
    private categoryService: CategoryService,
    private supplierService: SupplierService,
    private router: Router
  ) {
    this.goodForm = this.formBuilder.group({
      products: this.formBuilder.array([])
    });

    this.addProduct();
  }

  ngOnInit(): void {
    this.loadBrands();
    this.loadCategories();
    this.loadSuppliers();
  }

  get products(): FormArray {
    return this.goodForm.get('products') as FormArray;
  }

  createProductForm(): FormGroup {
    const group = this.formBuilder.group({
      name: ['', Validators.required],
      details: [''],
      invoice: [''],
      date: [new Date(), Validators.required],
      paid: [],
      due: [0],
      price: [],
      qty: [],
      discount: [],
      brand: [0, Validators.required],
      category: [0, Validators.required],
      supplier: [],
     totalPrice: [{ value: 0, disabled: true }], 
    finalPrice: [{ value: 0, disabled: true }]
    });

    group.valueChanges.subscribe(values => {
      const price = +values.price! ;
      const qty = +values.qty! || 0;
      const discount = +values.discount !|| 0;
      const paid = +values.paid !|| 0;

      const total = price * qty;
      const final = total - discount;
      const due = final - paid;

      group.patchValue({
        totalPrice: total,
        finalPrice: final,
        due: due
      }, { emitEvent: false });
    });

    return group;
  }

  addProduct(): void {
    this.products.push(this.createProductForm());
  }

  removeProduct(index: number): void {
    if (this.products.length > 1) {
      this.products.removeAt(index);
    }
  }

  onSubmit(): void {
  if (this.goodForm.invalid) {
    alert('Please fill in all required fields.');
    return;
  }

  const formValue = this.goodForm.getRawValue(); // ✅ Important fix here

  const newProducts: GoodModel[] = formValue.products.map((formProduct: any) => ({
    ...formProduct,
    brand: { id: formProduct.brand },
    category: { id: formProduct.category },
    supplier: { id: formProduct.supplier }
  }));

  newProducts.forEach((product, index) => {
    this.goodService.addGoods(product).subscribe(() => {
      if (index === newProducts.length - 1) {
        alert('All products added successfully!');
        this.router.navigate(['/viewgoods']);
      }
    });
  });
}

  loadBrands(): void {
    this.brandService.getAllBrand().subscribe({
      next: res => this.brands = res,
      error: err => console.error('Error loading brands:', err)
    });
  }

  loadCategories(): void {
    this.categoryService.getAllCategory().subscribe({
      next: res => this.categories = res,
      error: err => console.error('Error loading categories:', err)
    });
  }

  loadSuppliers(): void {
    this.supplierService.getAllSupplier().subscribe({
      next: res => this.supplier = res,
      error: err => console.error('Error loading suppliers:', err)
    });
  }
}
