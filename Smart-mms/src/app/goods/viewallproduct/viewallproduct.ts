import { Component } from '@angular/core';

@Component({
  selector: 'app-viewallproduct',
  standalone: false,
  templateUrl: './viewallproduct.html',
  styleUrl: './viewallproduct.css'
})
export class Viewallproduct {

viewDetails(product: any) {
  console.log('Viewing details of:', product);
  // Navigate to a detailed view page or open a modal
}

editProduct(product: any) {
  console.log('Editing product:', product);
  // Navigate to edit form or show a form inline
}



}