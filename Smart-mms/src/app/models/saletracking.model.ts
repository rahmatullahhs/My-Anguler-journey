export class SalestrackingModel {

  id!: string;
  orderId!: string;
  saleDate!: string;
  amount!: number;
  status!: 'Completed' | 'Pending' | 'Cancelled';

  constructor(
    orderId: string,
    saleDate: string,
    amount: number
  ) {
    this.orderId = orderId;
    this.saleDate = saleDate;
    this.amount = amount;
  }
}
