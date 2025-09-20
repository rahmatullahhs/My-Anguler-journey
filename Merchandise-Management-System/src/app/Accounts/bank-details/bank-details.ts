import { Component } from '@angular/core';

// ✅ Define interfaces above the component
interface BankDetails {
  accountHolder: string;
  bankName: string;
  accountNumber: string;
  ifscCode: string;
}

interface TaxReport {
  totalIncome: number;
  taxPaid: number;
  taxDue: number;
}


@Component({
  selector: 'app-bank-details', 
  standalone: false,
   templateUrl: './bank-details.html',
   styleUrl: './bank-details.css'
})
export class BankDetailsComponent {





  bankDetails: BankDetails | null = {
    accountHolder: 'John Doe',
    bankName: 'Bank of Angular',
    accountNumber: '1234567890',
    ifscCode: 'ANGU0001234'
  };

  editMode = false;
  originalDetails: BankDetails | null = null;

  taxReport: TaxReport | null = null;
  reportGenerated = false;

  editBankDetails() {
    this.editMode = true;
    // backup current details in case of cancel
    this.originalDetails = this.bankDetails ? { ...this.bankDetails } : null;
  }

  saveBankDetails() {
    this.editMode = false;
    this.originalDetails = null;
    // TODO: Call API to save bank details
  }

  cancelEdit() {
    this.editMode = false;
    this.bankDetails = this.originalDetails;
    this.originalDetails = null;
  }

  generateReport() {
    // Simulate generating tax report data
    this.taxReport = {
      totalIncome: 100000,
      taxPaid: 15000,
      taxDue: 5000
    };
    this.reportGenerated = true;
  }

  resetReport() {
    this.taxReport = null;
    this.reportGenerated = false;
  }
}