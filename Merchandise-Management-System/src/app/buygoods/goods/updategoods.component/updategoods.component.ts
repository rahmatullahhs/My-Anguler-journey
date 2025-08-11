import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GoodService } from '../../../service/buygood/good.service';
import { BrandService } from '../../../service/buygood/brand.service';
import { CategoryService } from '../../../service/buygood/category.service';
import { SupplierService } from '../../../service/mankind/supplier.service';
import { GoodModel } from '../../../models/goods/good.model';
import { BrandModel } from '../../../models/goods/brand.model';
import { CategoryModel } from '../../../models/goods/category.model';
import { SupplierModel } from '../../../models/human/supplier.model';

@Component({
  selector: 'app-updategoods.component',
  standalone: false,
  templateUrl: './updategoods.component.html',
  styleUrls: ['./updategoods.component.css'] // ✅ fixed `styleUrl`
})
export class UpdategoodsComponent implements OnInit {
  goodsForm: FormGroup;
  brands: BrandModel[] = [];
  categories: CategoryModel[] = [];
  suppliers: SupplierModel[] = [];
goodId: number | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private goodService: GoodService,
    private brandService: BrandService,
    private categoryService: CategoryService,
    private supplierService: SupplierService
  ) {
    this.goodsForm = this.formBuilder.group({
      id: [''],
      brandId: ['', Validators.required],
      categoryId: ['', Validators.required],
      goodsName: ['', Validators.required],
      details: [''],
      invoice: [''],
      supplierId: [''],
      date: [null],
      qty: [0, [Validators.required, Validators.min(0)]],
      price: [0, [Validators.required, Validators.min(0)]],
      
      paid: [0],
      due: [0]
    });
  }

  ngOnInit(): void {
  this.loadDropdownData();

  const idParam = this.route.snapshot.paramMap.get('id');
  this.goodId = idParam !== null ? +idParam : null;  // Convert string to number or null

  if (this.goodId !== null) {
    this.goodService.getGoodsById(this.goodId).subscribe((good: GoodModel) => {
      this.goodsForm.patchValue(good);
      this.calculateDue();
    });
  }

  this.goodsForm.valueChanges.subscribe(() => this.calculateDue());
}


  loadDropdownData(): void {
    this.brandService.getAllBrand().subscribe(res => this.brands = res);
    this.categoryService.getAllCategory().subscribe(res => this.categories = res);
    this.supplierService.getAllSupplier().subscribe(res => this.suppliers = res);
  }

  calculateDue(): void {
    const form = this.goodsForm.value;
    const total = (form.qty || 0) * (form.price || 0);
    const discounted = total - (total * ((form.discount || 0) / 100));
    const due = discounted - (form.paid || 0);

    this.goodsForm.patchValue({ due }, { emitEvent: false });
  }

  onSubmit(): void {
    if (this.goodsForm.invalid) return;

    const updatedGoods: GoodModel = this.goodsForm.value;

    this.goodService.updateGoods(updatedGoods).subscribe({
      next: () => {
        alert('Product updated successfully!');
        this.router.navigate(['/viewgoods']);
      },
      error: err => {
        console.error('Update failed:', err);
        alert('Failed to update product.');
      }
    });
  }
}
