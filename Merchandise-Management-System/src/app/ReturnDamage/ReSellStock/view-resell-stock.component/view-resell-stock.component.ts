import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // ✅ Import Router for navigation
import { ResellStockModel } from '../../../models/ReturnProduct/resellstock.model';
import { ResellStockService } from '../../../service/ReturnProduct/resell-stock.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  standalone:false,
  selector: 'app-view-resell-stock.component',
  templateUrl: './view-resell-stock.component.html',
  styleUrls: ['./view-resell-stock.component.css']
})
export class ViewResellStockComponent implements OnInit {

  stockItems: ResellStockModel[] = [];
  errorMessage = '';

  constructor(
    private resellStockService: ResellStockService,
    private toastr: ToastrService,
    private router: Router // ✅ Inject Router
  ) {}

  ngOnInit() {
    this.loadStock();
  }

  // ✅ Load stock items from backend
  loadStock() {
    this.resellStockService.getAllResellstock().subscribe({
      next: (data) => {
        this.stockItems = data;
      },
      error: (err) => {
        console.error('Failed to load resell stock items', err);
        this.errorMessage = 'Failed to load resell stock items.';
      }
    });
  }

  // ✅ Edit item: Navigate to edit page
 onEdit(item: ResellStockModel) {
  this.router.navigate(['/addresellstock', item.id]);
}

  // ✅ Delete item: Confirm and delete from server
  onDelete(item: ResellStockModel) {
    if (confirm(`Are you sure you want to delete "${item.name}"?`)) {
      this.resellStockService.deleteResellstock(item.id).subscribe({
        next: () => {
          this.toastr.success('Item deleted successfully');
          this.loadStock(); // Refresh the list
        },
        error: (err) => {
          console.error('Delete failed', err);
          this.toastr.error('Failed to delete item');
        }
      });
    }
  }
}
