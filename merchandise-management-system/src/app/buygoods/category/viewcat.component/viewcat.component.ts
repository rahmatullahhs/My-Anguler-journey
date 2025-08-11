import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../service/buygood/category.service';
import { Router } from '@angular/router';

@Component({
  standalone:false,
  selector: 'app-viewcat.component',
  templateUrl: './viewcat.component.html',
  styleUrls: ['./viewcat.component.css']
})
export class ViewcatComponent implements OnInit {
  category: any[] = [];

  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadAllCategory();
  }

  loadAllCategory(): void {
    this.categoryService.getAllCategory().subscribe({
      next: res => {
        this.category = Array.isArray(res) ? res : [];
      },
      error: err => {
        console.error('Failed to load categories:', err);
        this.category = [];
      }
    });
  }

  updateCategory(id: number): void {
    this.router.navigate(['updateCategory']); // ✅ this path must match the routing config
  }

  deleteCategory(id?: number): void {
    if (id) {
      this.categoryService.deleteCategory(id).subscribe({
        next: () => {
          this.loadAllCategory(); // Refresh list
        },
        error: err => {
          console.error('Error deleting category:', err);
        }
      });
    }
  }
}
