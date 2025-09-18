import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExpenseService } from '../../../service/Expanses/expense.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-addexpense.component',
  standalone: false,
  templateUrl: './addexpense.component.html',
  styleUrl: './addexpense.component.css'
})
export class AddexpenseComponent {
  expenseForm!: FormGroup;
  isSaving = false;

  constructor(
    private fb: FormBuilder,
    private expenseService: ExpenseService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.expenseForm = this.fb.group({
      date: [this.formatDate(new Date()), Validators.required],
      title: ['', Validators.required],
      description: [''],
      amount: [null, [Validators.required, Validators.min(1)]],
      paid: [''],
      due: [''],
      paymentMethod: ['Cash'],
      addedBy: ['Admin'] // You can set current user if available
    });
  }

  saveExpense(): void {
    if (this.expenseForm.invalid) {
      this.toastr.warning('Please fill all required fields.');
      return;
    }

    this.isSaving = true;
    const expenseData = this.expenseForm.value;

    this.expenseService.addExpense(expenseData).subscribe({
      next: () => {
        this.toastr.success('Expense saved successfully.');
        this.expenseForm.reset();
        this.expenseForm.get('date')?.setValue(this.formatDate(new Date())); // Reset date
        this.expenseForm.get('paymentMethod')?.setValue('Cash');
        this.isSaving = false;
      },
      error: (err) => {
        console.error('Error saving expense:', err);
        this.toastr.error('Failed to save expense.');
        this.isSaving = false;
      }
    });
  }

  private formatDate(date: Date): string {
    return date.toISOString().split('T')[0]; // Formats to yyyy-MM-dd
  }
}
