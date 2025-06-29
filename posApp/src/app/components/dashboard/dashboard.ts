import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  products: Product[] = [];
  totalStock: number = 0;
  totalProducts: number = 0;

  // Chart data
  stockChartData: any[] = [];
  brandPieChartData: any[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.products = this.dataService.getProducts();
    this.totalProducts = this.products.length;
    this.totalStock = this.products.reduce((sum, p) => sum + p.stock_qty, 0);

    this.prepareCharts();
  }

  prepareCharts() {
    this.stockChartData = this.products.map(p => ({
      name: p.name,
      value: p.stock_qty,
    }));

    const brandMap: { [brand: string]: number } = {};
    for (const p of this.products) {
      brandMap[p.brand] = (brandMap[p.brand] || 0) + 1;
    }

    this.brandPieChartData = Object.keys(brandMap).map(brand => ({
      name: brand,
      value: brandMap[brand],
    }));
  }
}


