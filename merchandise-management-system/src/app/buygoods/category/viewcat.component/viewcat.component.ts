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
employees: any[] = [];

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
        this.employees = Array.isArray(res) ? res : res?.data || [];
      },
      error: err => {
        console.error('Failed to load employees:', err);
        this.employees = [];
      }
    });
  }

  updateEmp(id: string): void {
    this.router.navigate(['updateEmp', id]);
  }

  deleteEmp(id: string): void {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.categoryService.deleteCategory(id).subscribe({
        next: () => {
          this.loadAllEmp();
        },
        error: err => {
          console.error('Error deleting employee:', err);
        }
      });
    }
  }
}


