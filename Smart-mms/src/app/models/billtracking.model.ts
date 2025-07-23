export class BilltrackingModel {

  id!:string;
  date!: string;           // e.g. '2025-07-22' or ISO string
  description!: string;    // Description of the transaction
  invoice!: string;         // Invoice or bill number
  payable!: number;         // Amount involved
//   status!: 'Paid' | 'Unpaid' | 'Pending';  // Payment status

}

    

