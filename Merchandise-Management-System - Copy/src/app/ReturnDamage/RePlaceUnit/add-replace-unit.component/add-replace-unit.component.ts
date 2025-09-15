import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReplaceunitService } from '../../../service/ReturnProduct/replaceunit.service';
import { Router } from '@angular/router';
import { ReplaceunitModel } from '../../../models/ReturnProduct/replaceunit.model';

@Component({
  selector: 'app-add-replace-unit.component',
  standalone: false,
  templateUrl: './add-replace-unit.component.html',
  styleUrl: './add-replace-unit.component.css'
})
export class AddReplaceUnitComponent {
 

  formGroup!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private replaceUnitService: ReplaceunitService,
    private router: Router,
    public cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      name: [''],
      details: [''],
      qty: [''],
      price: [''],

    });
  }

  addReplaceUnit(): void {
    if (this.formGroup.invalid) return;

    const replaceunit: ReplaceunitModel = { ...this.formGroup.value };

    this.replaceUnitService.createReplaceunit(replaceunit).subscribe({
      next: (res) => {
        console.log('replaceunit Saved:', res);
        this.formGroup.reset();
        this.router.navigate(['/viewreplaceUnit']);
        this.cdr.markForCheck();// Adjust route as needed
      },
      error: (error) => {
        console.error('Error saving replaceunit:', error);
      }
    });
  }
}






