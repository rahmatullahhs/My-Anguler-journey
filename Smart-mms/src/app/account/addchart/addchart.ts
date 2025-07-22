import { Component } from '@angular/core';

@Component({
  selector: 'app-addchart',
  standalone: false,
  templateUrl: './addchart.html',
  styleUrl: './addchart.css'
})
export class Addchart {

  totalSales = 120000;     // You fetch this from your sales data
  totalPurchases = 60000;  // From purchase records
  totalExpenses = 15000;   // From expense records

  get netProfit(): number {
    return this.totalSales - this.totalPurchases - this.totalExpenses;
  }
}

