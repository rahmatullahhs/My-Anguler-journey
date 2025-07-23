import { OrderModel } from "./order.model";

export class SalestrackingModel {

  id!: string;
  orderId!: string;
  invoice!: string;
  orderDate!: string;
  orderDue!: number;
  status!: 'Completed' | 'Pending' | 'Cancelled';
  orderModel!: {
    id: string;
    invoice: string;
    orderDate: string;
    customername: string;
    customerphone: string;
    customeremail: string;
    productdetail: string;
    productqty: number;
    totalAmount: number;
    paid: number;
    due: number;
  }

}
