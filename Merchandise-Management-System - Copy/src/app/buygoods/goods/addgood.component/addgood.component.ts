import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  editing: boolean = false;
  goodModel: GoodModel[] = [];
  categories: CategoryModel[] = [];
  brands: BrandModel[] = [];
  supplier: SupplierModel[] = [];

  totalprice: number = 0;
  finalprice: number = 0;
  due: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private goodService: GoodService,
    private brandService: BrandService,
    private categoryService: CategoryService,
    private supplierService: SupplierService
  ) {
    this.goodForm = this.formBuilder.group({
      id: [null],
      name: ['', Validators.required],
      details: [''],
      invoice: [''],
      date: [new Date(), Validators.required],
      paid: [0],
      due: [0],
      price: [0],
      qty: [0],
      discount: [0], // ✅ Added discount
      brandId: [null, Validators.required],
      categoryId: [null, Validators.required],
      supplierId: [null]
    });
  }

  ngOnInit(): void {
    this.loadGood();
    this.loadBrands();
    this.loadCategories();
    this.loadSupplier();

    this.goodForm.valueChanges.subscribe(() => {
      this.PriceCalculation();
    });
  }

  loadGood(): void {
    this.goodService.getAllGoods().subscribe(res => {
      this.goodModel = res;
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

  loadSupplier(): void {
    this.supplierService.getAllSupplier().subscribe({
      next: res => this.supplier = res,
      error: err => console.error('Error loading suppliers:', err)
    });
  }

  onSubmit(): void {
    if (!this.goodForm.valid) {
      alert('Please fill in required fields.');
      return;
    }

    const formValue = this.goodForm.value;

    if (this.editing && formValue.id) {
      this.goodService.updateGoods(formValue).subscribe(() => {
        alert('Product updated successfully!');
        this.loadGood();
        this.cancelEdit();
      });
    } else {
      const newProduct: GoodModel = {
        ...formValue
      };

      this.goodService.addGoods(newProduct).subscribe(() => {
        alert('Product added successfully!');
        this.loadGood();
        this.goodForm.reset({
          name: '',
          details: '',
          invoice: '',
          date: new Date(),
          paid: 0,
          due: 0,
          price: 0,
          qty: 0,
          discount: 0,
          brandId: null,
          categoryId: null,
          supplierId: null
        });
        this.router.navigate(['/viewallstock']);
      });
    }
  }

  editGoods(good: GoodModel): void {
    this.editing = true;
    this.goodForm.patchValue(good);
  }

  deleteGoods(id: number): void {
    const confirmed = confirm('Are you sure you want to delete this goods?');
    if (!confirmed) return;

    this.goodService.deleteGoods(id).subscribe({
      next: () => {
        alert('Goods deleted!');
        this.loadGood();
      },
      error: (err) => {
        console.error('Failed to delete goods:', err);
        alert('An error occurred while deleting the goods.');
      }
    });
  }

  cancelEdit(): void {
    this.editing = false;
    this.goodForm.reset({
      name: '',
      details: '',
      invoice: '',
      date: new Date(),
      paid: 0,
      due: 0,
      price: 0,
      qty: 0,
      discount: 0,
      brandId: null,
      categoryId: null,
      supplierId: null
    });
  }

  getBrandName(brandId: number): string {
    return this.brands.find(b => b.id === brandId)?.name || 'N/A';
  }

  getCategoryName(categoryId: number): string {
    return this.categories.find(c => c.id === categoryId)?.name || 'N/A';
  }

  getSupplierName(supplierId: number): string {
    return this.supplier.find(s => s.id === supplierId)?.name || 'N/A';
  }

  PriceCalculation(): void {
    const price = Number(this.goodForm.value.price) || 0;
    const qty = Number(this.goodForm.value.qty) || 0;
    const paid = Number(this.goodForm.value.paid) || 0;
    const discount = Number(this.goodForm.value.discount) || 0;

    this.totalprice = price * qty;
    this.finalprice = this.totalprice - discount;
    this.due = this.finalprice - paid;

    this.goodForm.patchValue({
      due: this.due
    }, { emitEvent: false });
  }

  onFocusLost(): void {
    this.PriceCalculation();
  }
}
