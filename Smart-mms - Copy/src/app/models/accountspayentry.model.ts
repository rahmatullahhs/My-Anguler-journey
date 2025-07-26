export interface AccountspayentryModel {


  id?: string; // Optional, if you're adding it as a new bill
  addentryID: string;
  amount: number;
  billDate: string; // Use ISO format for dates (e.g. YYYY-MM-DD)
  note?: string;  // Optional, so it can be empty if not filled
}

