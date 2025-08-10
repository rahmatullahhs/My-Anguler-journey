import { Component, OnInit } from '@angular/core';
import { GoodService } from '../../../service/buygood/good.service';
import { GoodModel } from '../../../models/goods/good.model';

@Component({
  selector: 'app-viewgoods.component',
  standalone: false,
  templateUrl: './viewgoods.component.html',
  styleUrls: ['./viewgoods.component.css'] // ✅ fixed: styleUrl → styleUrls
})
export class ViewgoodsComponent implements OnInit {
  goods: GoodModel[] = [];
  isLoading = false;
  error = '';

  constructor(private productService: GoodService) {}

  ngOnInit(): void {
    this.loadgoods();
  }

  loadgoods(): void {
    this.isLoading = true;
    this.productService.getAllGoods().subscribe({
      next: (res: GoodModel[]) => {
        this.goods = res;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load goods:', err);
        this.error = 'Error loading goods.';
        this.isLoading = false;
      }
    });
  }

  deleteProduct(id: string): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteGoods(id).subscribe({
        next: () => {
          alert('Product deleted!');
          this.loadgoods();
        },
        error: err => {
          console.error('Delete failed:', err);
          alert('Failed to delete product.');
        }
      });
    }
  }
}
