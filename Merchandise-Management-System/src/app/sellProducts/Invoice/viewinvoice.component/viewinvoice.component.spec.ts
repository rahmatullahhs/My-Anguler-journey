import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewinvoiceComponent } from './viewinvoice.component';

describe('ViewinvoiceComponent', () => {
  let component: ViewinvoiceComponent;
  let fixture: ComponentFixture<ViewinvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewinvoiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewinvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
// // ......
// export class ViewinvoiceComponent implements OnInit {

//   invoices: any[] = [];
//   reinvoices: any[] = [];

//   allCombinedInvoices: any[] = [];  // 🔄 Combined list

//   loading = false;
//   searchTerm: string = '';
//   error: any;

//   constructor(
//     private invoiceService: InvoiceService,
//     private reinvoiceService: ReinvoiceService, // ✅ Injected
//     private router: Router,
//     public cdr: ChangeDetectorRef
//   ) {}

//   ngOnInit(): void {
//     this.loading = true;
//     this.loadAllData();
//   }

//   loadAllData(): void {
//     // Load both invoices and reinvoices in parallel
//     this.invoiceService.getAllInvoice().subscribe({
//       next: invoiceRes => {
//         this.invoices = Array.isArray(invoiceRes) ? invoiceRes : invoiceRes?.data || [];
//         this.reinvoiceService.getAllReinvoices().subscribe({
//           next: reinvoiceRes => {
//             this.reinvoices = Array.isArray(reinvoiceRes) ? reinvoiceRes : reinvoiceRes?.data || [];
//             this.mergeInvoices();
//             this.loading = false;
//             this.cdr.markForCheck();
//           },
//           error: reinvoiceErr => {
//             console.error('❌ Failed to load reinvoices:', reinvoiceErr);
//             this.reinvoices = [];
//             this.mergeInvoices(); // Still show what we can
//             this.loading = false;
//           }
//         });
//       },
//       error: invoiceErr => {
//         console.error('❌ Failed to load invoices:', invoiceErr);
//         this.invoices = [];
//         this.loading = false;
//       }
//     });
//   }

//   mergeInvoices(): void {
//     // Add type tag so we can distinguish
//     const taggedInvoices = this.invoices.map(inv => ({ ...inv, type: 'Invoice' }));
//     const taggedReinvoices = this.reinvoices.map(inv => ({ ...inv, type: 'ReInvoice' }));

//     this.allCombinedInvoices = [...taggedInvoices, ...taggedReinvoices];
//   }

//   get filteredInvoice() {
//     const term = this.searchTerm.toLowerCase();
//     return this.allCombinedInvoices.filter(inv =>
//       inv.name?.toLowerCase().includes(term) ||
//       inv.invoice?.toLowerCase().includes(term) ||
//       inv.invoiceNumber?.toLowerCase().includes(term) || // for reinvoice
//       inv.email?.toLowerCase().includes(term) ||
//       inv.date?.toLowerCase().includes(term)
//     );
//   }

//   deleteInvoice(id: number, type: string): void {
//     if (confirm('Are you sure you want to delete this invoice?')) {
//       if (type === 'Invoice') {
//         this.invoiceService.deleteInvoice(id).subscribe({
//           next: () => this.loadAllData(),
//           error: err => console.error('❌ Error deleting invoice:', err)
//         });
//       } else {
//         this.reinvoiceService.deleteReinvoice(id).subscribe({
//           next: () => this.loadAllData(),
//           error: err => console.error('❌ Error deleting reinvoice:', err)
//         });
//       }
//     }
//   }
// }
