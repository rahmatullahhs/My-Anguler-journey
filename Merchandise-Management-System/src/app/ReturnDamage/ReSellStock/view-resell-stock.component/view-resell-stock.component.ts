// view-resell-stock.component.ts

import { Component, OnInit } from '@angular/core';
import { ResellStockModel } from '../../../models/ReturnProduct/resellstock.model';
import { ResellStockService } from '../../../service/ReturnProduct/resell-stock.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  standalone:false,
  selector: 'app-view-resell-stock.component',
  templateUrl: './view-resell-stock.component.html',
  styleUrls: ['./view-resell-stock.component.css']
})
export class ViewResellStockComponent implements OnInit {

  stockItems: ResellStockModel[] = [];
  errorMessage = '';

  constructor(
    private resellStockService: ResellStockService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.loadStock();
  }

  loadStock() {
    this.resellStockService.getAllResellstock().subscribe({
      next: (data) => {
        this.stockItems = data;
      },
      error: (err) => {
        console.error('Failed to load resell stock items', err);
        this.errorMessage = 'Failed to load resell stock items.';
      }
    });
  }
}
