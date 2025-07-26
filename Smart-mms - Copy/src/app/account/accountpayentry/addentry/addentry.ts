import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AddentryModel } from '../../../models/addentry.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddentryService } from '../../../services/addentry.service';

@Component({
  selector: 'app-addentry',
  standalone: false,
  templateUrl: './addentry.html',
  styleUrl: './addentry.css'
})
export class Addentry implements OnInit{
   entries: AddentryModel[] = [];
  entryForm: FormGroup;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private addentryService: AddentryService,
       private cdr:ChangeDetectorRef
  ) {
    this.entryForm = this.fb.group({
      id: [null],
      name: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getAllEntry();
  }

  getAllEntry() {
    this.addentryService.getAllEntry().subscribe(data => {
      this.entries = data;
            this.cdr.markForCheck();
    });
  }

  onSubmit() {
    if (this.entryForm.valid) {
      const entries: AddentryModel = this.entryForm.value;

      if (this.isEditMode && entries.id) {
        // UPDATE
        this.addentryService.updateEntry(entries).subscribe(() => {
          this.getAllEntry();
          this.resetForm();
        });
      } else {
        // CREATE
        const newEntry: AddentryModel = { name: entries.name }; // no ID
        this.addentryService.addEntry(newEntry).subscribe(() => {
          this.getAllEntry();
          this.entryForm.reset();
        });
      }
    }
  }


  editEntry(entries: AddentryModel) {
    this.entryForm.patchValue(entries);
    this.isEditMode = true;
  }

  deleteEnty(id?: string) {
    if (id) {
      this.addentryService.deleteEntry(id).subscribe(() => {
        this.getAllEntry();
      });
    }
  }

  resetForm() {
    this.entryForm.reset();
    this.isEditMode = false;
  }

}






