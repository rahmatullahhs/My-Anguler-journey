// src/app/services/accounts/finance.service.ts

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BalanceSheet } from '../../models/Accounts/balance-sheet.model';


@Injectable({
  providedIn: 'root'
})
export class FinanceService {

  constructor() {}

  getBalanceSheet(): Observable<BalanceSheet> {
    return of({
      assets: {
        inventory: 300000,
        cash: 50000,
        bank: 120000,
        receivables: 40000,
      },
      liabilities: {
        payables: 60000,
        loans: 100000,
        salaries: 20000,
      },
      equity: {
        capital: 250000,
        retainedEarnings: 80000
      }
    });
  }
}


// getBalanceSheet(): Observable<BalanceSheet> {
//   return this.http.get<BalanceSheet>(`${this.api}/finance/balance-sheet`);
// }