import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../service/sale-product/cart.service';

@Component({
  selector: 'app-addcheckout.component',
  standalone: false,
  templateUrl: './addcheckout.component.html',
  styleUrl: './addcheckout.component.css'
})
export class AddcheckoutComponent implements OnInit{
cartItems: any[] = [];
  total: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    const cart = this.cartService.getCart();
    this.cartItems = cart.items;
    this.total = cart.total;
  }

// printInvoice(): void {
//     const el = document.getElementById('invoiceToPrint');
//     if (!el) return;
//     el.style.display = 'block';
//     setTimeout(() => {
//       html2canvas(el).then(canvas => {
//         const img = canvas.toDataURL('image/png');
//         const pdf = new jsPDF('p', 'mm', 'a4');
//         const w = pdf.internal.pageSize.getWidth();
//         const h = (canvas.height * w) / canvas.width;
//         pdf.addImage(img, 'PNG', 0, 0, w, h);
//         pdf.save(`${this.orderForm.value.customername || 'invoice'}.pdf`);
//         el.style.display = 'none';
//       });
//     }, 300);
//   }



}

