import { Component } from '@angular/core';
import { ChartType } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard {
  public pieChartLabels: string[] = ['Sales', 'Purchase', 'Profit'];
  public pieChartData: number[] = [300, 500, 200];
  public pieChartType: ChartType = 'pie';

  public barChartLabels: string[] = ['Jan', 'Feb', 'Mar', 'Apr'];
  public barChartData = [
    { data: [65, 59, 80, 81], label: 'Revenue' }
  ];
  public barChartType: ChartType = 'bar';
}
