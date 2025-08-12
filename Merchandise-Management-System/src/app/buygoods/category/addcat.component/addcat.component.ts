import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../../service/buygood/category.service';
import { Router } from '@angular/router';
import { CategoryModel } from '../../../models/goods/category.model';

@Component({
  standalone:false,
  selector: 'app-addcat.component',
  templateUrl: './addcat.component.html',
  styleUrls: ['./addcat.component.css']
})
export class AddcatComponent implements OnInit {

  categoryForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  addCategory(): void {
    if (this.categoryForm.invalid) return;

    const category: CategoryModel = { ...this.categoryForm.value };
    this.categoryService.addCategory(category).subscribe({
      next: (res) => {
        console.log('Category saved:', res);
        this.categoryForm.reset();
        this.router.navigate(['/viewcategory']);
      },
      error: (error) => {
        console.error('Error:', error);
      }
    });
  }
}
