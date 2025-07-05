import { Component } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-admin-dashboard',
  standalone: false,
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
  templateUrl: './admin-dashboard.component.html'
})
export class AdminDashboard {


@Component({

})

  users: any[] = [];

  constructor(private http: HttpClient) {}

  fetchUsers() {
    this.http.get('http://localhost:3000/api/users').subscribe({
      next: (data: any) => this.users = data,
      error: () => alert('Failed to fetch users')
    });
  }
}




  // Bar chart config
  barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
  };

  barChartLabels: string[] = ['Gaming', 'Business', 'Ultrabook', 'Others'];
  barChartData = [
    { data: [10, 20, 5, 3], label: 'Laptops by Category' }
  ];





