
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CategoryModel } from '../../models/category.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-addcategory',
  standalone: false,
  templateUrl: './addcategory.html',
  styleUrl: './addcategory.css'
})
export class Addcategory implements OnInit {

  categories: CategoryModel[] = [];
  categoryForm: FormGroup;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private cdr:ChangeDetectorRef
  ) {
    this.categoryForm = this.fb.group({
      id: [null],
      name: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories() {
    this.categoryService.getAllCategory().subscribe(data => {
      this.categories = data;
      this.cdr.markForCheck();
    });
  }

  onSubmit() {
    if (this.categoryForm.valid) {
      const category: CategoryModel = this.categoryForm.value;

      if (this.isEditMode && category.id) {
        // UPDATE
        this.categoryService.updateCategory(category).subscribe(() => {
          this.getAllCategories();
          this.resetForm();
        });
      } else {
        // CREATE
        const newCategory: CategoryModel = { name: category.name }; // no ID
        this.categoryService.addCategory(newCategory).subscribe(() => {
          this.getAllCategories();
          this.categoryForm.reset();
        });
      }
    }
  }


  editCategory(category: CategoryModel) {
    this.categoryForm.patchValue(category);
    this.isEditMode = true;
  }

  deleteCategory(id?: string) {
    if (id) {
      this.categoryService.deleteCategory(id).subscribe(() => {
        this.getAllCategories();
      });
    }
  }

  resetForm() {
    this.categoryForm.reset();
    this.isEditMode = false;
  }

}





