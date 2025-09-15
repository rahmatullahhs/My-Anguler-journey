import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ExpenseService } from '../../../service/Expanses/expense.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-viewexpense.component',
  standalone: false,
  templateUrl: './viewexpense.component.html',
  styleUrl: './viewexpense.component.css'
})
export class ViewexpenseComponent implements OnInit{

 expenses: any[] = [];
  isLoading = false;
    filteredExpenses: any[] = [];

      // Filter/search
  searchTerm: string = '';
  startDate: string = '';
  endDate: string = '';

  constructor(
    private expenseService: ExpenseService,
    private toastr: ToastrService,
      private cdr: ChangeDetectorRef
  ) {}

ngOnInit(): void {
  this.loadExpenses();
}


loadExpenses(): void {
  this.isLoading = true;

  this.expenseService.getAllExpense().subscribe({
    next: (data) => {
      this.expenses = data;
      this.filterExpenses(); // 👈 filter right after loading
      this.isLoading = false;
       this.cdr.detectChanges(); // 👈 force detection if needed
    },
    error: (err) => {
      console.error('Error loading expenses:', err);
      this.toastr.error('Failed to load expenses.');
      this.isLoading = false;
    }
  });
}


  deleteExpense(id: number): void {
    if (!confirm('Are you sure you want to delete this expense?')) {
      return;
    }

    this.expenseService.deleteExpense(id).subscribe({
      next: () => {
        this.toastr.success('Expense deleted successfully.');
        this.loadExpenses(); // reload list
      },
      error: (err) => {
        console.error('Error deleting expense:', err);
        this.toastr.error('Failed to delete expense.');
      }
    });
  }




  filterExpenses(): void {
    this.filteredExpenses = this.expenses.filter(expense => {
      const matchesSearch = this.searchTerm
        ? (expense.title?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
           expense.description?.toLowerCase().includes(this.searchTerm.toLowerCase()))
        : true;

      const expenseDate = new Date(expense.date);
      const from = this.startDate ? new Date(this.startDate) : null;
      const to = this.endDate ? new Date(this.endDate) : null;

      const matchesDateRange = (!from || expenseDate >= from) &&
                               (!to || expenseDate <= to);

      return matchesSearch && matchesDateRange;
    });
  }

  clearFilters(): void {
  this.searchTerm = '';
  this.startDate = '';
  this.endDate = '';
  this.filterExpenses();
}
 

}
