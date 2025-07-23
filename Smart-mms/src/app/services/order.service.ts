import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { OrderModel } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  baseUrl: string = "http://localhost:3000/order";

  constructor(private http: HttpClient) { }


  getAllOrder(): Observable<any> {
    return this.http.get(this.baseUrl);

  }

  saveOrder(orderModel: OrderModel): Observable<any> {
    return this.http.post(this.baseUrl, orderModel);

  }

  deleteOrder(id: string): Observable<any> {
    return this.http.delete(this.baseUrl + "/" + id);

  }

  getOrderById(id: string): Observable<any> {
    return this.http.get(this.baseUrl+'/'+id);

  }

  updateOrder(id: string, orderModel: OrderModel): Observable<any>{
    return this.http.put(this.baseUrl+'/'+id, orderModel);

  }


  getOrderTotals(): Observable<{ totalPaid: number; totalAmount: number; totalDue: number }> {
  return this.http.get<OrderModel[]>(this.baseUrl).pipe(
    map((orders: OrderModel[]) => {
      let totalPaid = 0, totalAmount = 0, totalDue = 0;
      orders.forEach(order => {
        totalPaid += order.paid;
        totalAmount += order.totalAmount;
        totalDue += order.due;
      });
      return { totalPaid, totalAmount, totalDue };
    })
  );
}

// sellProduct(productId: string, quantity: number) {
//   return this.http.post('/api/sell', { productId, quantity });
// }


}
