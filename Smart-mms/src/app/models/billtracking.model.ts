export class BilltrackingModel {


  date!: string;           // e.g. '2025-07-22' or ISO string
  description!: string;    // Description of the transaction
  billNo!: string;         // Invoice or bill number
  amount!: number;         // Amount involved
  status!: 'Paid' | 'Unpaid' | 'Pending';  // Payment status
}

    

