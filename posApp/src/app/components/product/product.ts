import { Component } from '@angular/core';

@Component({
  selector: 'app-product',
  standalone: false,
  templateUrl: './product.html',
  styleUrl: './product.css'
})
export class Product {


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
})
export class ProductComponent {
  products: Product[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.products = this.dataService.getProducts();
  }

  deleteProduct(id: number) {
    this.dataService.deleteProduct(id);
    this.products = this.dataService.getProducts();
  }
}
import { ExportService } from 'src/app/services/export.service';

constructor(private dataService: DataService, private exportService: ExportService) {}

exportPDF() {
  this.exportService.exportToPDF(this.products);
}

exportExcel() {
  this.exportService.exportToExcel(this.products);
}

}
