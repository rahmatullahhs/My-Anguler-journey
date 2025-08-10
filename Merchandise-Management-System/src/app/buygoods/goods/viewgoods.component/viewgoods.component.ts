import { Component } from '@angular/core';

@Component({
  selector: 'app-viewgoods.component',
  standalone: false,
  templateUrl: './viewgoods.component.html',
  styleUrl: './viewgoods.component.css'
})
export class ViewgoodsComponent {




  
  deleteProduct(id: string): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.delete(id).subscribe(() => {
        alert('Product deleted!');
        this.loadProducts();
      });
    }
  }
}
