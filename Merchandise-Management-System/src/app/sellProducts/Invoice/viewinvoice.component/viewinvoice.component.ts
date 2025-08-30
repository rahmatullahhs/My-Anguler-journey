import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { InvoiceModel } from '../../../models/products/invoice.model';
import { InvoiceService } from '../../../service/sale-product/invoice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viewinvoice.component',
  standalone: false,
  templateUrl: './viewinvoice.component.html',
  styleUrl: './viewinvoice.component.css'
})
export class ViewinvoiceComponent implements OnInit{
  invoice: InvoiceModel[] = [];

  constructor(
    private invoiceService: InvoiceService,
    
    private router: Router,
     public cdr:ChangeDetectorRef 
  ) {}

  ngOnInit(): void {
    this.loadInvoice();
    
  }

  loadInvoice(): void {
    this.invoiceService.getAllInvoice().subscribe(data => {
      this.invoice = data;
      this.cdr.markForCheck();
    });
  }

}
