import { Component } from '@angular/core';
import { CategoryService } from '../../../service/buygood/category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viewcat.component',
  standalone: false,
  templateUrl: './viewcat.component.html',
  styleUrl: './viewcat.component.css'
})
export class ViewcatComponent {
category: any[] = [];

  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadAllEmp();
  }

  loadAllEmp(): void {
    this.categoryService.getAllCategory().subscribe({
      next: res => {
        // Defensive check and fallback if API structure is dynamic
        this.category = Array.isArray(res) ? res : [];
      },
      error: err => {
        console.error('Failed to load employees:', err);
        this.category = [];
      }
    });
  }

  updateCategory(id: string): void {
    this.router.navigate(['updateEmp', id]);
  }

   deleteCategory(id?: string) {
    if (id) {
      this.categoryService.deleteCategory(id).subscribe(() => {
        this.getAllCategory();
      });
    }
  }
        error: err => {
          console.error('Error deleting employee:', err);
        }
      });
    }
  }
}


