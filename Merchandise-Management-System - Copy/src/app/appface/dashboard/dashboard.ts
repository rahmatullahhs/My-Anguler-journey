import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ChartData, ChartOptions } from 'chart.js';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';
@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
 styleUrls: ['./dashboard.css']
})
export class Dashboard {

  // ✅ Plugin reference for template binding
  ChartDataLabels = DataLabelsPlugin;

  // ✅ Sales value for display
  salesValue: string = '$12,340';
  salesPeriod: string = 'Today';

  // ✅ Used for browser-specific rendering (like canvas)
  isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  // ✅ Update the period and value dynamically
  updateSales(period: string, value: string): void {
    this.salesPeriod = period;
    this.salesValue = value;
  }

  // ✅ Line Chart Data & Configuration
  lineChartData: ChartData<'line'> = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Sales',
        data: [1200, 1900, 3000, 2500, 2800, 3500],
        borderColor: '#007bff',
        backgroundColor: 'rgba(0,123,255,0.1)',
        fill: true,
        tension: 0.3
      }
    ]
  };

  lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: '#333'
        }
      }
    }
  };

  // ✅ Pie Chart Data & Configuration
  pieChartLabels: string[] = ['Laptops', 'Keyboards', 'Mice', 'Headsets', 'Docking Stations'];

  pieChartData: ChartData<'pie', number[], string> = {
    labels: this.pieChartLabels,
    datasets: [
      {
        data: [450, 120, 180, 90, 60],
        backgroundColor: ['#007bff', '#17a2b8', '#28a745', '#ffc107', '#dc3545']
      }
    ]
  };

  pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#333'
        }
      },
      datalabels: {
        formatter: (value: number, context: any) => {
          const total = context.chart.data.datasets[0].data.reduce((a: number, b: number) => a + b, 0);
          return ((value / total) * 100).toFixed(1) + '%';
        },
        color: '#fff',
        font: {
          weight: 'bold',
          size: 14
        }
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) => `${tooltipItem.label}: ${tooltipItem.raw} units`
        }
      }
    }
  };

  // ✅ Overview Cards (reusable UI block)
  overviewCards = [
    { title: 'Last Month Profit', value: '$78,900', bg: 'bg-success' },
    { title: 'Top-Selling Products', value: 'Hp EliteBook', bg: 'bg-info' },
    { title: 'Sales Channels', value: 'Online / Retail', bg: 'bg-warning' },
  ];

  // ✅ Sectional Reports for business insights
  infoSections = [
    {
      title: 'Inventory Management',
      items: [
        'Current Stock: 4,230 units',
        'Low Stock Alerts: 7 items',
        'Out-of-Stock Items: 2',
        'Fast-moving: T-Shirts'
      ]
    },
    {
      title: 'Customer Insights',
      items: [
        'Total Customers: 1,240',
        'New This Month: 98',
        'Top Customer: Jane Doe ($1,200)'
      ]
    },
    {
      title: 'Profit & Cost Analytics',
      items: [
        'Gross Profit: $18,900',
        'COGS: $6,400',
        'Margin: 67%'
      ]
    },
    {
      title: 'Order Management',
      items: [
        'Orders Today: 48',
        'Pending: 12, Completed: 36',
        'Cancelled: 2',
        'Avg Fulfillment Time: 1.2 Days'
      ]
    },
    {
      title: 'Time-Based Trends',
      items: [
        'Monthly Sales Growth: +12%',
        'Seasonal Peak: Nov-Dec'
      ]
    },
    {
      title: 'Category Performance',
      items: [
        'Top Category: Streetwear',
        'Profit Leader: Outerwear',
        'Low Stock: Accessories'
      ]
    },
    {
      title: 'Alerts & Notifications',
      bgClass: 'text-white bg-danger',
      items: [
        'Low Stock: 7 items',
        'High Returns Detected: Hoodie XL',
        'Sales Drop: Accessories (↓15%)'
      ]
    }
  ];
}
