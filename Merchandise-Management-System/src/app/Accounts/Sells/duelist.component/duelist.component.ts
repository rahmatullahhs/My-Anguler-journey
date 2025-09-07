import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DuelistService } from '../../../service/sale-product/duelist.service';
import { DuelistModel } from '../../../models/Accounts/duelist.model';

@Component({
  standalone: false,
  selector: 'app-duelist',
  templateUrl: './duelist.component.html',
  styleUrls: ['./duelist.component.css']
})
export class DuelistComponent implements OnInit {

  duelists: DuelistModel[] = [];
  loading = false;
  searchTerm = '';
  error: any;

  constructor(
    private duelistService: DuelistService,
    private router: Router,
    public cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.loadAllDue();
  }

  loadAllDue(): void {
    this.duelistService.getAllDue().subscribe({
      next: res => {
        this.cdr.markForCheck();
        this.duelists = res;
        this.loading = false;
      },
      error: err => {
        console.error('Failed to load invoices:', err);
        this.duelists = [];
        this.loading = false;
        this.error = err;
      }
    });
  }

  get filteredDueList(): DuelistModel[] {
    const term = this.searchTerm.toLowerCase().trim();
    if (!term) return this.duelists;

    return this.duelists.filter(due => {
      const customerName = due.customerName?.toLowerCase() || '';
      const invoiceNumber = due.invoiceNumber?.toLowerCase() || '';
      const dateString = due.date ? new Date(due.date).toLocaleDateString().toLowerCase() : '';
      return (
        customerName.includes(term) ||
        invoiceNumber.includes(term) ||
        dateString.includes(term)
      );
    });
  }

  deleteDue(id: number): void {
    if (confirm('Are you sure you want to delete this invoice?')) {
      this.duelistService.deleteDue(id).subscribe({
        next: () => {
          this.loadAllDue();
        },
        error: err => {
          console.error('Error deleting invoice:', err);
        }
      });
    }
  }
}
