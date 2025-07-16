import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ProductModel } from "../../models/product.model";
import { ProductService } from "../../services/product.service";
import { Component, OnInit } from "@angular/core";
import { BrandService } from "../../services/brand.service";
import { BrandModel } from "../../models/brand.model";
import { CategoryModel } from "../../models/category.model";
import { CategoryService } from "../../services/category.service";
import { SupplierModel } from "../../models/supplier.model";
import { SupplierService } from "../../services/supplier.service";
import { LedgerbookModel } from "../../models/ledgerbook.model";

@Component({
  selector: 'app-addproduct',
  standalone: false,
  templateUrl: './addproduct.html',
  styleUrls: ['./addproduct.css']
})
export class AddProduct implements OnInit {
  products!: any;
  productForm: FormGroup;
  editing: boolean = false;
  categories: CategoryModel[] = [];
  brands: BrandModel[] = [];
  supplier:SupplierModel[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private brandService: BrandService,
    private categoryService: CategoryService,
    private supplierService: SupplierService
  ) {
    this.productForm = this.formBuilder.group({
      id: [null],  // In case you use it for edit
      name: ['', Validators.required],
      graphicscard: [''],
      monitor: [''],
      processor: [''],
      ram: [''],
      storage: [''],

       invoice: [''],
      discount: [0],
      paid: [0],
      due: [0],

      price: [0],
      stock_qty: [0],
       brandId: ['', Validators.required] ,
        categoryId: ['', Validators.required] ,
         supplierId: ['']
        
    });
  }

 ngOnInit(): void {
  this.loadProducts();
  this.loadBrands();
  this.loadCategories();
  this.loadSupplier();
  
  // Auto calculate on any relevant input change
  this.productForm.valueChanges.subscribe(() => {
    this.PriceCalculation();
  });
}

  loadProducts(): void {
    this.products = this.productService.getAll();
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

loadCategories(): void {
  this.categoryService.getAllCategory().subscribe({
    next: (res) => {
      this.categories = res;
    },
    error: (err) => {
      console.error('Error loading categories:', err);
    }
  });
}

loadSupplier(): void {
  this.supplierService.getAllSupplier().subscribe({
    next: (res) => {
      this.supplier = res;
    },
    error: (err) => {
      console.error('Error loading supplier:', err);
    }
  });
}



  onSubmit() {
  if (this.productForm.valid) {
    const product: ProductModel = this.productForm.value;

    if (this.editing && product.id) {
      // UPDATE
      this.productService.update(product).subscribe(() => {
        alert('Product updated successfully!');
        this.loadProducts();
        this.cancelEdit();
      });
    } else {
      // CREATE product
      const newProduct: ProductModel = {
        name: product.name,
        processor: product.processor,
        ram: product.ram,
        storage: product.storage,
        graphicscard: product.graphicscard,
        monitor: product.monitor,

         invoice:  product.invoice,
         discount: product.discount,
         paid: product.paid,
          due: product.due,
  
        price: product.price,
        stock_qty: product.stock_qty,
        brandId: product.brandId,
          categoryId: product.categoryId,
          supplierId: product.supplierId
      };
      this.productService.add(newProduct).subscribe(() => {
        alert('Product added successfully!');
        this.loadProducts();
        this.productForm.reset();

// ✅ ADD LEDGER ENTRY
        const ledgerEntry: LedgerbookModel = {
          productId: createdProduct.id,  // use ID returned from backend
       
        


    date:new Date(),

  paid:product.paid,
  due: product.due,

  debit:0,

  credit: 0
 
       
         
        };


        this.ledgerService.add(ledgerEntry).subscribe(() => {
          console.log('Ledger entry created.');
        });



      });


      // Determine accounting behavior
if (product.paid && product.paid > 0 && product.due === 0) {
  // Fully paid purchase
  ledgerEntry.debit = product.paid;      // Expense (purchase)
  ledgerEntry.credit = product.paid;     // Cash reduced
  ledgerEntry.account = 'Cash Purchase';
} else if (product.due && product.due > 0 && product.paid === 0) {
  // Fully due (credit purchase)
  ledgerEntry.debit = product.due;       // Purchase account
  ledgerEntry.credit = 0;
  ledgerEntry.account = 'Accounts Payable';
} else if (product.paid > 0 && product.due > 0) {
  // Partially paid
  ledgerEntry.debit = product.paid + product.due; // Total purchase cost
  ledgerEntry.credit = product.paid;              // Paid cash portion
  ledgerEntry.account = 'Partially Paid';
}
    }
  } else {
    alert('Please fill in required fields.');
  }
}


  editProduct(product: ProductModel): void {
    this.editing = true;
    this.productForm.patchValue(product);
  }

  deleteProduct(id: string): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.delete(id).subscribe(() => {
        alert('Product deleted!');
        this.loadProducts();
      });
    }
  }

  getBrandName(brandId: string): string {
    return this.brands.find(b => b.id === brandId)?.name || 'N/A';
  }



getCategoryName(categoryId: string): string {
  return this.categories.find(c => c.id === categoryId)?.name || 'N/A';
}

 getSupplierName(supplierId: string): string {
    return this.supplier.find(s => s.id === supplierId)?.name || 'N/A';
  }

  cancelEdit(): void {
    this.editing = false;
    this.productForm.reset({
      id: null,
      name: '',
      graphicscard: '',
      monitor: '',
      processor: '',
      ram: '',
      storage: '',
      
      invoice: '',
      discount: 0,
      paid: 0,
      due: 0,
      price: 0,
      stock_qty: 0,

      brandId: null,
      categoryId: null,
      supplierId:null
    });
  }
price!:number;
 stock_qty!: number;
  totalprice!: number;
   discount!: number;
    finalprice!: number;
     paid!: number;
      due!: number;
PriceCalculation() {
  const price = Number(this.productForm.value.price) || 0;
  const stock_qty = Number(this.productForm.value.stock_qty) || 0;
  const discount = Number(this.productForm.value.discount) || 0;
  const paid = Number(this.productForm.value.paid) || 0;

  this.totalprice = price * stock_qty;
  this.finalprice = this.totalprice - (this.totalprice * (discount / 100));
  this.due = this.finalprice - paid;

  // Optional: Update the form with calculated values if needed
  this.productForm.patchValue({
    due: this.due
  }, { emitEvent: false }); // prevent infinite loop
}

onFocusLost(){
    this.PriceCalculation();
  }










}







