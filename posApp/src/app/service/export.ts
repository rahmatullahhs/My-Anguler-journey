import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Injectable({ providedIn: 'root' })
export class ExportService {
  exportToExcel(products: Product[]): void {
    const worksheet = XLSX.utils.json_to_sheet(products);
    const workbook = { Sheets: { 'Products': worksheet }, SheetNames: ['Products'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    FileSaver.saveAs(blob, 'Laptop_Products.xlsx');
  }

  exportToPDF(products: Product[]): void {
    const doc = new jsPDF();

    const rows = products.map(p => [
      p.name,
      p.brand,
      p.processor,
      p.ram,
      p.storage,
      p.price,
      p.stock_qty
    ]);

    autoTable(doc, {
      head: [['Name', 'Brand', 'Processor', 'RAM', 'Storage', 'Price', 'Stock']],
      body: rows,
      theme: 'grid',
    });

    doc.save('Laptop_Products.pdf');
  }jspdf + jspdf-autotable → for PDF
}
