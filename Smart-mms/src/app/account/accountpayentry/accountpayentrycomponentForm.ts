import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountspayentryModel } from '../../models/accountspayentry.model';
import { AddentryModel } from '../../models/addentry.model';
import { AddentryService } from '../../services/addentry.service';
import { AccountpayentryService } from '../../services/accountpayentry.service';


@Component({
  selector: 'app-accountpayentry',
  standalone: false,
  templateUrl: './accountpayentry.html',
  styleUrls: ['./accountpayentry.css']
})
export class AccountPayEntryComponent implements OnInit {
  accountpayentrycomponentForm: FormGroup;
  editing: boolean = false;
  accountpayentrys: AccountspayentryModel[] = [];
  entries: AddentryModel[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private accountpayentry: AccountpayentryService,
    private addentryservice: AddentryService
  ) {
    // Initialize the form group here
    this.accountpayentrycomponentForm = this.formBuilder.group({
      id: [null], // Optional, for editing existing entries
      addentryID: ['', Validators.required], // Addentry selection should be required
      amount: [0, [Validators.required, Validators.min(0)]], // Amount required and non-negative
      billDate: ['', Validators.required], // Date is required
      note: [''], // Optional note
    });
  }

  ngOnInit(): void {
    this.loadAccountPayEntry(); // Load Account Pay Entries
    this.loadAddEntry(); // Load all Add Entries (for dropdown selection)
  }

  // Load existing account pay entries
  loadAccountPayEntry(): void {
    this.accountpayentry.getAllAccountPayEntry().subscribe(res => {
      this.accountpayentrys = res;
    });
  }

  // Load Add Entries to populate the dropdown
  loadAddEntry(): void {
    this.addentryservice.getAllEntry().subscribe({
      next: res => this.entries = res,
      error: err => console.error('Error loading entries:', err)
    });
  }

  // Submit the form (either create or update)
  onSubmit(): void {
    if (this.accountpayentrycomponentForm.valid) {
      const formValues = this.accountpayentrycomponentForm.value;

      if (this.editing && formValues.id) {
        // UPDATE existing account pay entry
        this.accountpayentry.updateAccountPayEntry(formValues).subscribe(() => {
          this.loadAccountPayEntry(); // Reload account pay entries
          this.resetForm(); // Reset form after submit
        });
      } else {
        // CREATE new account pay entry
        const newEntry: AccountspayentryModel = {
          addentryID: formValues.addentryID,
          amount: formValues.amount,
          billDate: formValues.billDate,
          note: formValues.note || '', // Optional field
        };

        this.accountpayentry.addAccountPayEntry(newEntry).subscribe(() => {
          this.loadAccountPayEntry(); // Reload account pay entries
          this.resetForm(); // Reset form after submit
        });
      }
    }
  }

  // Set the form for editing
  editEntry(accountPayEntry: AccountspayentryModel): void {
    this.accountpayentrycomponentForm.patchValue({
      id: accountPayEntry.id,
      addentryID: accountPayEntry.addentryID,
      amount: accountPayEntry.amount,
      billDate: accountPayEntry.billDate,
      note: accountPayEntry.note
    });

    this.editing = true; // Set editing mode
  }

  // Delete the entry by ID
  deleteEntry(id: string): void {
    if (id) {
      this.accountpayentry.deleteAccountPayEntry(id).subscribe(() => {
        this.loadAccountPayEntry(); // Reload account pay entries
      });
    }
  }

  // Reset the form
  resetForm(): void {
    this.accountpayentrycomponentForm.reset();
    this.editing = false; // Reset editing mode
  }
getEntryNameById(id: string): string {
  const match = this.entries.find(e => e.id === id);
  return match ? match.name : 'Unknown';
}



}
