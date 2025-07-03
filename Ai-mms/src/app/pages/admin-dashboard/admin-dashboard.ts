import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  standalone: false,
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css'
})
export class AdminDashboard {
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html'
})
export class AdminDashboardComponent {
  users: any[] = [];

  constructor(private http: HttpClient) {}

  fetchUsers() {
    this.http.get('http://localhost:3000/api/users').subscribe({
      next: (data: any) => this.users = data,
      error: () => alert('Failed to fetch users')
    });
  }
}

import { ChartConfiguration } from 'chart.js';

export class AdminDashboardComponent {
  // Bar chart config
  barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
  };

  barChartLabels: string[] = ['Gaming', 'Business', 'Ultrabook', 'Others'];
  barChartData = [
    { data: [10, 20, 5, 3], label: 'Laptops by Category' }
  ];
}



}
