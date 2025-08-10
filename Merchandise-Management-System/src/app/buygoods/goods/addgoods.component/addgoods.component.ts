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
  selector: 'app-addgoods.component',
  standalone: false,
  templateUrl: './addgoods.component.html',
  styleUrls: ['./addgoods.component.css'] // Fixed: styleUrl → styleUrls
})
export class AddgoodsComponent implements OnInit {
  goodsForm: FormGroup;
  products: GoodModel[] = [];
  categories: CategoryModel[] = [];
  brands: BrandModel[] = [];
  suppliers: SupplierModel[] = [];

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
    private supplierService: SupplierService,
  ) {
    this.goodsForm = this.formBuilder.group({
      id: [null],
      brandId: ['', Validators.required],
      categoryId: ['', Validators.required],
      goodsName: ['', Validators.required],
      details: [''],
      invoice: [''],
      supplierId: [''],
      date: [null],
      qty: [0, [Validators.required, Validators.min(0)]],
      price: [0, [Validators.required, Validators.min(0)]],
      discount: [0, [Validators.min(0)]],
      paid: [0, [Validators.min(0)]],
      due: [0, [Validators.min(0)]],
    });
  }

  ngOnInit(): void {
    this.loadGoods();
    this.loadBrands();
    this.loadCategory();
    this.loadSupplier();

    this.goodsForm.valueChanges.subscribe(() => {
      this.PriceCalculation();
    });
  }

  loadGoods(): void {
    this.goodService.getAllGoods().subscribe(res => {
      this.products = res;
    });
  }

  loadBrands(): void {
    this.brandService.getAllBrand().subscribe({
      next: res => this.brands = res,
      error: err => console.error('Error loading brands:', err)
    });
  }

  loadCategory(): void {
    this.categoryService.getAllCategory().subscribe({
      next: res => this.categories = res,
      error: err => console.error('Error loading categories:', err)
    });
  }

  loadSupplier(): void {
    this.supplierService.getAllSupplier().subscribe({
      next: res => this.suppliers = res, // ✅ FIXED
      error: err => console.error('Error loading suppliers:', err)
    });
  }

  onSubmit(): void {
    if (this.goodsForm.invalid) return;

    const newGoods: GoodModel = this.goodsForm.value;

    this.goodService.addGoods(newGoods).subscribe({
      next: res => {
        console.log('Goods saved:', res);
        this.goodsForm.reset();
        this.loadGoods();
        this.router.navigate(['/viewallstock']);
      },
      error: err => {
        console.error('Error saving goods:', err);
      }
    });
  }

  getBrandById(brandId: string): string {
    return this.brands.find(b => b.id === brandId)?.name || 'N/A';
  }

  getCategoryName(categoryId: string): string {
    return this.categories.find(c => c.id === categoryId)?.name || 'N/A';
  }

  getSupplierName(supplierId: string): string {
    return this.suppliers.find(s => s.id === supplierId)?.name || 'N/A';
  }

  PriceCalculation(): void {
    const price = Number(this.goodsForm.value.price) || 0;
    const qty = Number(this.goodsForm.value.qty) || 0;
    const discount = Number(this.goodsForm.value.discount) || 0;
    const paid = Number(this.goodsForm.value.paid) || 0;

    this.totalprice = price * qty;
    this.finalprice = this.totalprice - (this.totalprice * (discount / 100));
    this.due = this.finalprice - paid;

    this.goodsForm.patchValue({
      due: this.due
    }, { emitEvent: false });
  }

  onFocusLost(): void {
    this.PriceCalculation();
  }
}
