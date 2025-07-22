import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CogsService } from '../../services/cogs.service';  // Update this to your COGS service
import { CogsModel } from '../../models/cogs.model';  // Updated COGS model import

@Component({
  selector: 'app-addcogs',
  standalone: false,
  templateUrl: './cogs.html',  // Update this to your template path
  styleUrls: ['./cogs.css']    // Update this to your CSS path
})
export class AddCogsComponent implements OnInit {

  cogsList: CogsModel[] = [];  // Array to hold all COGS data
  cogsForm: FormGroup;  // Form for COGS data
  isEditMode = false;  // Flag to track if in edit mode

  constructor(
    private fb: FormBuilder,
    private cogsService: CogsService  // Service to interact with COGS API
  ) {
    // Initialize form with the appropriate fields
    this.cogsForm = this.fb.group({
      id: [null],  // ID for editing COGS
      productprice: [null],  // Product price
      transportfee: [null],  // Transport fee
      labourcost: [null],  // Labour cost
      packingcost: [null],  // Packing cost
      tax: [null],  // Tax
        totalCogs: []
    });
  }

  ngOnInit(): void {
    this.getAllCogs();  // Fetch all COGS data on component load
  }

  // Fetch all COGS data from the server
  getAllCogs() {
    this.cogsService.getAllCogs().subscribe(data => {
      this.cogsList = data;  // Store fetched COGS data
    });
  }

  // Method to calculate the total COGS
  calculateTotalCogs(): number {
    const formValues = this.cogsForm.value;
    return formValues.productprice +
           formValues.transportfee +
           formValues.labourcost +
           formValues.packingcost +
           formValues.tax;
  }

  // Handle form submission
  onSubmit() {
    if (this.cogsForm.valid) {
      const totalCogs = this.calculateTotalCogs();  // Calculate total COGS

      const cogs: CogsModel = { 
        ...this.cogsForm.value, 
        totalCogs: totalCogs  // Add calculated total COGS to the model
      };

      if (this.isEditMode && cogs.id) {
        // If in edit mode, update the existing COGS
        this.cogsService.updateCogs(cogs).subscribe(() => {
          this.getAllCogs();  // Refresh the COGS list
          this.resetForm();   // Reset the form after submission
        });
      } else {
        // If new entry, add a new COGS record
        this.cogsService.addCogs(cogs).subscribe(() => {
          this.getAllCogs();  // Refresh the COGS list
          this.resetForm();   // Reset the form after submission
        });
      }
    }
  }

  // Edit an existing COGS entry
  editCogs(cogs: CogsModel) {
    this.cogsForm.patchValue(cogs);  // Patch the form with the COGS data
    this.isEditMode = true;  // Set edit mode to true
  }

  // Delete a COGS entry by its ID
  deleteCogs(id: string) {
    if (id) {
      this.cogsService.deleteCogs(id).subscribe(() => {
        this.getAllCogs();  // Refresh the COGS list after deletion
      });
    }
  }

  // Reset the form
  resetForm() {
    this.cogsForm.reset();  // Reset the form fields
    this.isEditMode = false;  // Reset edit mode flag
  }
}
