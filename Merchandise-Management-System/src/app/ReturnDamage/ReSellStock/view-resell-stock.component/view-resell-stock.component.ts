import { Component, OnInit } from '@angular/core';
import { ResellStockModel } from '../../../models/ReturnProduct/resellstock.model';
import { ResellStockService } from '../../../service/ReturnProduct/resell-stock.service';

@Component({
  selector: 'app-view-resell-stock.component',
  standalone: false,
  templateUrl: './view-resell-stock.component.html',
  styleUrl: './view-resell-stock.component.css'
})
export class ViewResellStockComponent implements OnInit {

stockItems: ResellStockModel[] = [];

  constructor(private resellStockService: ResellStockService) {}

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
      }
    });
  }

}



