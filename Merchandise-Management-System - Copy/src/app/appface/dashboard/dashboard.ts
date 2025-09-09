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
  // ✅ Make datalabels plugin available to the template
  ChartDataLabels = DataLabelsPlugin;

  // ✅ Browser check
  isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  lineChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Sales',
      data: [1200, 1900, 3000, 2500, 2800, 3500],
      borderColor: '#007bff',
      backgroundColor: 'rgba(0,123,255,0.1)',
      fill: true,
      tension: 0.3
    }]
  };

  lineChartLabels = this.lineChartData.labels;

  lineChartOptions = {
    responsive: true,
    plugins: {
      legend: { display: true }
    }
  };






  // ✅ Pie Chart Data (Product Distribution)
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
        position: 'bottom'
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
}
