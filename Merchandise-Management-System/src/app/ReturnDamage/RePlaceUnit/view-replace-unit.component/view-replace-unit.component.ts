import { Component, OnInit } from '@angular/core';
import { ReplaceunitModel } from '../../../models/ReturnProduct/replaceunit.model';
import { ReplaceunitService } from '../../../service/ReturnProduct/replaceunit.service';

@Component({
  selector: 'app-view-replace-unit.component',
  standalone: false,
  templateUrl: './view-replace-unit.component.html',
  styleUrl: './view-replace-unit.component.css'
})
export class ViewReplaceUnitComponent implements OnInit{

stockItems: ReplaceunitModel[] = [];

  constructor(private replaceunitService: ReplaceunitService) {}

  ngOnInit() {
    this.loadUnit();
  }

  loadUnit() {
    this.replaceunitService.getAllReplaceunit().subscribe({
      next: (data) => {
        this.stockItems = data;
      
      },
      error: (err) => {
        console.error('Failed to load resell stock items', err);
      }
    });
  }

}



