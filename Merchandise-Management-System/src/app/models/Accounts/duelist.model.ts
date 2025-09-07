export interface DuelistModel {
    
  id?: number;                // optional, since it might not exist before saving
  invoiceNumber: string;
  date: Date;                 // use JS Date object for timestamp
  customerName: string;
  totalAmount: number;
  due: number;
  payment: number;
}


