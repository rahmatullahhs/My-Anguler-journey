import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmpSalaryService } from '../../services/empsalary.service';
import { Employee } from '../../models/employee'; // Make sure this model contains necessary salary fields
import { Empsalary } from '../../models/empsalary.model';

@Component({
  standalone: false,
  selector: 'app-empsalary',
  templateUrl: './empsalary.html',
  styleUrls: ['./empsalary.css']

})
export class EmpSalaryComponent implements OnInit {
  empsalaries: Empsalary[] = [];

  salaryForm: FormGroup;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private empsalaryService: EmpSalaryService
  ) {
    this.salaryForm = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      basicsalary: [0, Validators.required],
      bonus: [0],
      allowance: [0],
      totalpayable: [{ value: 0, disabled: true }]
    });

    // Update totalpayable dynamically when relevant fields change
    this.salaryForm.valueChanges.subscribe(() => this.updateTotalPayable());
  }

  ngOnInit(): void {
    this.getAllEmpSalary();
  }

  getAllEmpSalary() {
    this.empsalaryService.getAllEmpSalary().subscribe(data => {
      this.empsalaries = data;
    });
  }

  updateTotalPayable() {
    const { basicsalary, bonus, allowance } = this.salaryForm.getRawValue();
    const total = (Number(basicsalary) || 0) + (Number(bonus) || 0) + (Number(allowance) || 0);
    this.salaryForm.get('totalpayable')?.setValue(total, { emitEvent: false });
  }

  onSubmit() {
    if (this.salaryForm.valid) {
      const formValue = this.salaryForm.getRawValue();
      const empsalary: Empsalary = {
        id: formValue.id,
        name: formValue.name,
        basicsalary: formValue.basicsalary,
        bonus: formValue.bonus,
        allowance: formValue.allowance,
        totalpayable: formValue.totalpayable
      };

      if (this.isEditMode && empsalary.id) {
        // ✅ Pass both `id` and `empsalary` as separate arguments
        this.empsalaryService.updateEmpSalary(empsalary.id, empsalary).subscribe(() => {
          this.getAllEmpSalary();
          this.resetForm();
        });
      } else {
        this.empsalaryService.saveEmpSalary(empsalary).subscribe(() => {
          this.getAllEmpSalary();
          this.resetForm();
        });
      }
    }
  }


 editEmpSalary(id: string | undefined) {
  if (!id) return;

  const empsalary = this.empsalaries.find(e => e.id === id);
  if (empsalary) {
    this.salaryForm.patchValue(empsalary);
    this.isEditMode = true;
    this.updateTotalPayable();
  }
}



  deleteEmpSalary(id?: string) {
    if (id) {
      this.empsalaryService.deleteEmpSalary(id).subscribe(() => {
        this.getAllEmpSalary();
      });
    }
  }

  resetForm() {
    this.salaryForm.reset({
      id: null,
      name: '',
      basicsalary: 0,
      bonus: 0,
      allowance: 0,
      totalpayable: 0
    });
    this.isEditMode = false;
  }
}
