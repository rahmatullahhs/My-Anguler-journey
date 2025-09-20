import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-support.components',
  standalone: false,
  templateUrl: './support.components.html',
  styleUrl: './support.components.css'
})
export class SupportComponents {
 formData = {
    name: '',
    email: '',
    message: ''
  };

  submitted = false;

  submitForm() {
    // TODO: send data to backend (email, save to DB, etc.)
    console.log('Support form submitted:', this.formData);
    this.submitted = true;

    // Optionally clear the form
    this.formData = {
      name: '',
      email: '',
      message: ''
    };
  }
}