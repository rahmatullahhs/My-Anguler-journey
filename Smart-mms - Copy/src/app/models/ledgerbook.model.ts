export class LedgerbookModel {



  id?: string;            // Optional for new entries
  productId!: string;      // Related product ID
  date!: Date;             // Date of the transaction

  paid!: number;           // Amount paid
  due!: number;            // Remaining due

  debit!: number;          // Debit amount (e.g. expense)
  credit!: number;         // Credit amount (e.g. cash out)

  account?: string;       // e.g., "Cash Purchase", "Accounts Payable", etc.
}

  



