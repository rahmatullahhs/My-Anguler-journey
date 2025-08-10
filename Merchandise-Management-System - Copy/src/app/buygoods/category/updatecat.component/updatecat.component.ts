import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryModel } from '../../../models/goods/category.model';
import { CategoryService } from '../../../service/buygood/category.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  standalone:false,
  selector: 'app-updatecat.component',
  templateUrl: './updatecat.component.html',
  styleUrls: ['./updatecat.component.css']
})
export class UpdatecatComponent implements OnInit {

  id!: string;
  categoryForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.id = this.activeRoute.snapshot.params['id'];
    this.categoryForm = this.fb.group({
      name: ['', Validators.required]
    });

    this.loadCategory();
  }

  loadCategory(): void {
    this.categoryService.getCategoryById(this.id).subscribe({
      next: (res) => {
        this.categoryForm.patchValue(res);
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Error fetching category:', error);
      }
    });
  }

  updateCategory(): void {
    if (this.categoryForm.invalid) return;

    const updatedCategory: CategoryModel = { id: this.id, ...this.categoryForm.value };
    this.categoryService.updateCategory(updatedCategory).subscribe({
      next: () => {
        this.router.navigate(['/viewcategory']);
      },
      error: (error) => {
        console.error('Error updating category:', error);
      }
    });
  }
  cancel(): void {
  this.router.navigate(['/viewcategory']);
}

}
