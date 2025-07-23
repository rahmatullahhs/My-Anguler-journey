import { OrderModel } from "./order.model";

export class SalestrackingModel {

  id!: string;
  status!: 'Completed' | 'Pending' | 'Cancelled';
  orderId!: string;
  
  }


