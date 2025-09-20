import { ChangeDetectorRef, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ChartData, ChartOptions } from 'chart.js';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { InvoiceService } from '../../service/sale-product/invoice.service';
import { ExpenseService } from '../../service/Expanses/expense.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard implements OnInit {

// sir
  todaysSlaes!: number;
  lastWeekSales!: number;
  lastMonthSales!: number;

  salesPeriod = 'Today';
  salesValue: number = 0;
  periods = ['Today', 'Last Week', 'Last Month'];
// ....

 // myDue

lastMonthDue!:number;
  dueValue: number=0;


  // Platform check
  isBrowser: boolean;

  
  // Date related
  currentYear = new Date().getFullYear();
  currentMonthName = '';
  lastMonthName = '';

  



  // Due and Expense related

  expenseAmount = '';

  // Chart data & options
  profitChartLabels: string[] = [];
  profitChartData: ChartData<'line'> = {
    labels: [], // your month labels go here
    datasets: [
      {
        label: 'Monthly Profit',
        data: [], // your profit data
        borderColor: 'darkviolet',                         // Line color
        backgroundColor: 'rgba(208, 140, 237, 0.29)',         // Fill under the line
        fill: true,
        tension: 0.0,                                      // Smooth curve
        pointBackgroundColor: '#48ffffff',            // Light orange fill
        pointBorderColor: '#794a04ff',                    // Point border color
        pointRadius: 3,                                   // Size of the point
        pointHoverRadius: 10                              // Size when hovered
      }
    ]
  };

  profitChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: { display: true },
      tooltip: {
        callbacks: {
          label: context => `Profit: $${context.raw}`
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: 'Profit ($)' }
      },
      x: {
        title: { display: true, text: 'Month' }
      }
    }
  };


  // Info sections for dashboard display
  infoSections = [
    {
      title: 'Stock Management',
      items: [
        'Current Stock: 4,230 units',
        'Low Stock Alerts: 7 items',
        'Out-of-Stock Items: 2',
        'Fast-moving: Acessories'
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
      title: 'Sales Management',
      items: [
        'Sales Today: 48',
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
        'Top Category: Laptops',
        'Profit Leader: Acessories',
        'Low Stock: Accessories'
      ]
    },
    {
      title: 'Alerts & Notifications',
      bgClass: 'text-white bg-danger',
      items: [
        'Low Stock: 7 items',
        'High Returns Detected:keyboards',
        'Sales Drop: Asus (↓15%)'
      ]
    }
  ];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private invoiceService: InvoiceService,
    private expenseService: ExpenseService,
    private cdr: ChangeDetectorRef
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }
//sir
  ngOnInit(): void {

    this.getSalesSummary();
    this.setCurrentMonth();
    this.setLastMonth();
    this.updateSales(this.salesPeriod);

    //mydue
    this.getDueSummary();
    this.setLastMonth();
    this.loadLastMonthExpenses();

    if (this.isBrowser) {
      this.generateProfitChartData();
    }
  }





  // Generate random profit data for the chart
  generateProfitChartData(): void {
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep'
    ];
    const profits = months.map(() => Math.floor(Math.random() * 10000) + 1000);

    this.profitChartLabels = months;
    this.profitChartData.labels = months;
    this.profitChartData.datasets[0].data = profits;
  }


  // sir
  updateSales(period: string): void {
    this.salesPeriod = period;
    console.log(period);

    switch (period) {
      case 'Today':
        this.salesValue = this.todaysSlaes;
        console.log(this.salesValue);
        break;
      case 'Last Week':
        this.salesValue = this.lastWeekSales;
        console.log(this.salesValue);
        break;
      case 'Last Month':
        this.salesValue = this.lastMonthSales;
        console.log(this.salesValue);
        break;
    }
  }

  setCurrentMonth(): void {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    this.currentMonthName = monthNames[new Date().getMonth()];
  }



  setLastMonth(): void {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const lastMonthIndex = new Date().getMonth() === 0 ? 11 : new Date().getMonth() - 1;
    this.lastMonthName = monthNames[lastMonthIndex];
  }

  loadLastMonthExpenses(): void {
    this.expenseService.getLastMonthExpenses().subscribe({
      next: response => {
        this.expenseAmount = response.expenseAmount || '$0';
        this.cdr.markForCheck();
      },
      error: err => {
        console.error('Error fetching expenses:', err);
        this.expenseAmount = '$0';
        this.cdr.markForCheck();
      }
    });
  }



 getSalesSummary() {
  this.invoiceService.getSalesSummary().subscribe({
    next: (data) => {
      this.todaysSlaes = data.today;
      this.lastWeekSales = data.last7Days;
      this.lastMonthSales = data.last30Days;

      // default selection
      this.salesValue = this.todaysSlaes;
    },
    error: (e) => console.error(e)
  });
}




 getDueSummary() {
  this.invoiceService.getDueSummary().subscribe({
    next: (data) => {
      this.lastMonthDue = data.last30Days;
      // default selection
      this.dueValue = this.lastMonthDue;
    },
    error: (e) => console.error(e)
  });
}


}