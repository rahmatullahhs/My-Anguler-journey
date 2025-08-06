import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../service/buygood/category.service';
import { Router } from '@angular/router';
import { CategoryModel } from '../../../models/goods/category.model';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-addcat.component',
  standalone: false,
  templateUrl: './addcat.component.html',
  styleUrl: './addcat.component.css'
})
export class AddcatComponent implements OnInit {

  categoryForm!: FormGroup;


  constructor(
    private formbuilder: FormBuilder,
    private categoryService: CategoryService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }


  ngOnInit(): void {
    this.categoryForm = this.formbuilder.group({
      name: ['']
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
