import { Component, OnInit } from '@angular/core';
import { FinanceService } from '../../service/Accounts/finance.service';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
@Component({
  selector: 'app-balance-sheet',
  standalone: false,
  templateUrl: './balance-sheet.html',
  styleUrl: './balance-sheet.css'
})
export class BalanceSheet implements OnInit {
  data: any = null;

  totalAssets = 0;
  totalLiabilities = 0;
  totalEquity = 0;

  constructor(private financeService: FinanceService) {}

  ngOnInit(): void {
    this.financeService.getBalanceSheet().subscribe(balance => {
      this.data = balance;
      this.calculateTotals();
    });
  }
calculateTotals(): void {
  if (!this.data) return;

  const { assets, liabilities, equity } = this.data;

  this.totalAssets = Object.values(assets as Record<string, number>).reduce((a, b) => a + b, 0);
  this.totalLiabilities = Object.values(liabilities as Record<string, number>).reduce((a, b) => a + b, 0);
  this.totalEquity = Object.values(equity as Record<string, number>).reduce((a, b) => a + b, 0);
}

  exportToExcel(): void {
    const wsData = [
      ['Category', 'Amount (৳)'],
      ['Inventory', this.data?.assets.inventory],
      ['Cash', this.data?.assets.cash],
      ['Bank', this.data?.assets.bank],
      ['Receivables', this.data?.assets.receivables],
      ['Payables', this.data?.liabilities.payables],
      ['Loans', this.data?.liabilities.loans],
      ['Salaries', this.data?.liabilities.salaries],
      ['Capital', this.data?.equity.capital],
      ['Retained Earnings', this.data?.equity.retainedEarnings],
      ['Total Assets', this.totalAssets],
      ['Total Liabilities + Equity', this.totalLiabilities + this.totalEquity]
    ];

    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(wsData);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Balance Sheet');

    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([wbout], { type: 'application/octet-stream' });

    saveAs(blob, `BalanceSheet_${new Date().toISOString().slice(0, 10)}.xlsx`);
  }
}


