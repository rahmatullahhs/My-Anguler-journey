import { Injectable } from '@angular/core';
import { Product } from '../model/product.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private products: Product[] = [
    {
      id: 1,
      name: 'HP EliteBook 840 G5',
      brand: 'HP',
      processor: 'Intel Core i5',
      ram: '8GB',
      storage: '256GB SSD',
      price: 65000,
      stock_qty: 10,
    },
    {
      id: 2,
      name: 'Dell Latitude 7490',
      brand: 'Dell',
      processor: 'Intel Core i7',
      ram: '16GB',
      storage: '512GB SSD',
      price: 85000,
      stock_qty: 5,
    },
  ];

  getProducts(): Product[] {
    return this.products;
  }

  addProduct(product: Product) {
    this.products.push(product);
  }

  deleteProduct(id: number) {
    this.products = this.products.filter(p => p.id !== id);
  }




  sellProduct(productId: number, qty: number): string {
  const product = this.products.find(p => p.id === productId);
  if (product) {
    if (product.stock_qty >= qty) {
      product.stock_qty -= qty;
      return 'success';
    } else {
      return 'not-enough-stock';
    }
  }
  return 'not-found';
}

}
