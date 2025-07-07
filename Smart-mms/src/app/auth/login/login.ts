import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

 loginForm!: FormGroup;
   errorMessage: string = '';

  constructor(
    private authService: AuthService, 
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

onSubmit(): void {
  if (this.loginForm.invalid) {
    this.errorMessage = 'Please fill in all required fields correctly.';
    return;
  }

  const userDetails = this.loginForm.value;

  this.authService.login(userDetails).subscribe({
    next: (res) => {
      console.log('User logged in successfully:', res);
      
      this.authService.storeToken(res.token);

      const role = this.authService.getUserRole();
      console.log('User role:', role);

      if (role === 'Admin') {
        this.router.navigate(['/userprofile']);
      } else if (role === 'User') {
        this.router.navigate(['/userprofile']);
      } else {
        this.errorMessage = 'Unknown user role.';
      }

      this.loginForm.reset();
    },
    error: (err) => {
      console.error('Error logging in:', err);
      this.errorMessage = 'Invalid email or password.';
    }
  });
}





}
