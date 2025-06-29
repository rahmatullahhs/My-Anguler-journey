import { Component } from '@angular/core';

@Component({
  selector: 'app-inventory',
  standalone: false,
  templateUrl: './inventory.html',
  styleUrl: './inventory.css'
})
export class Inventory {
import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
})
export class InventoryComponent implements OnInit {
  products: Product[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.products = this.dataService.getProducts();
  }

  isLowStock(stock: number): boolean {
    return stock < 5;
  }
}

}
