import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CogsModel } from '../../../models/Accounts/cogs.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CogsService } from '../../../service/Accounts/cogs.service';

@Component({
  selector: 'app-viewcogs.component',
  standalone: false,
  templateUrl: './viewcogs.component.html',
  styleUrl: './viewcogs.component.css'
})
export class ViewcogsComponent implements OnInit {

  cogsList: CogsModel[] = [];
  cogsForm: FormGroup;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private cogsService: CogsService,
    private cdr: ChangeDetectorRef
  ) {
    this.cogsForm = this.fb.group({
      id: [null],
      purchaseInvoice: ['', Validators.required],

      productName: ['', Validators.required],
      productQty:[],

      productPrice: [0, Validators.required],
      transportFee: [0, Validators.required],
      labourCost: [0, Validators.required],
      packingCost: [0, Validators.required],
      tax: [0],

      date:[''],
      
      totalCogs: [0],
  eachProductPrice: [0]

    });
  }

  ngOnInit(): void {
    this.getAllCogs();
  }
  getAllCogs() {
    this.cogsService.getAllCogs().subscribe(data => {
      this.cogsList = data;
      this.cdr.markForCheck();
    });
  }

}
