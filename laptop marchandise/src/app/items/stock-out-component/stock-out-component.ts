import { ChangeDetectorRef, Component } from '@angular/core';
import { Inventory } from '../../models/products/inventory.mode';
import { Item } from '../../models/products/item.model';
import { InventoryService } from '../../service/saleProduct/inventory-service';
import { ItemService } from '../../service/sale-product/item.service';

@Component({
  selector: 'app-stock-out-component',
  standalone: false,
  templateUrl: './stock-out-component.html',
  styleUrl: './stock-out-component.css'
})
export class StockOutComponent {
 stock: Inventory = {
    item: { id: 0, name: ''},
    quantity: 0
  };

  items: Item[] = [];
  message: string = '';

  constructor(
    private inventoryService: InventoryService,
    private itemService: ItemService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // this.itemService.getAllItem().subscribe({
    //   next: (data) => this.items = data,
    //   error: (err) => console.error('Failed to fetch items', err)
    // });

    this.loadAllItems();
  }

  removeStock(): void {
    if (this.stock.item.id > 0 && this.stock.quantity > 0) {
      this.inventoryService.removeStock(this.stock).subscribe({
        next: (res) => {
          this.message = res;
          this.stock.quantity = 0;
          this.stock.item.id = 0;
        },
        error: (err) => {
          console.error(err);
          this.message = err.error || 'Failed to remove stock.';
        }
      });
    } else {
      this.message = 'Please select an item and enter a valid quantity.';
    }
  }

    loadAllItems(): void {
   
      po: this.itemService.getAllItem().subscribe({
      next: (result) => {
        this.items = result;     

        console.log('Items:', this.items);
        this.cdr.detectChanges();


        
      },
      error: (err) => {
        console.error('Error loading data:', err);
        alert('Failed to load POs data');
      }
    });
  }
}
