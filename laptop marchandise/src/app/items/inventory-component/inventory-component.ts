import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { InventoryService } from '../../service/saleProduct/inventory-service';

@Component({
  selector: 'app-inventory-component',
  standalone: false,
  templateUrl: './inventory-component.html',
  styleUrl: './inventory-component.css'
})
export class InventoryComponent implements OnInit {
  inventories: any[] = [];

  constructor(private inventoryService: InventoryService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadInventories();
  }

  loadInventories(): void {
    this.inventoryService.getInventories().subscribe({
      next: (data) => {
        this.inventories = data;
        this.cdr.markForCheck();
        console.log(this.inventories);
      },
      error: (err) => console.error('Error loading inventories:', err),
    });
  }
}
