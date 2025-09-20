

export interface BalanceSheet {
  assets: {
    inventory: number;
    cash: number;
    bank: number;
    receivables: number;
    equipment?: number;
  };
  liabilities: {
    payables: number;
    loans: number;
    salaries: number;
  };
  equity: {
    capital: number;
    retainedEarnings: number;
  };
}
