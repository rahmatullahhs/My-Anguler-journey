export class LedgerbookModel {
    
  id!: number;                 
  date!: string;             
  description!: string;         
  accountType!: 'Asset' | 'Liability' | 'Equity' | 'Revenue' | 'Expense';
  debit!: number;               
  credit!: number;             
  balance!: number;           


}