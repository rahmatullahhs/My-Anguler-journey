import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-support.components',
  standalone: false,
  templateUrl: './support.components.html',
  styleUrl: './support.components.css'
})
export class SupportComponents {
 contactForm: FormGroup;
  submitted = false;
  successMessage = '';

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.contactForm.invalid) return;

    // Simulate sending
    console.log('Message Sent:', this.contactForm.value);
    this.successMessage = 'Your message has been sent successfully!';
    this.contactForm.reset();
    this.submitted = false;
  }
}
