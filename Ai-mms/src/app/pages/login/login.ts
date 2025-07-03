import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  loginData = { email: '', password: '' };

  constructor(private auth: AuthService, private router: Router) {}

  onLogin() {
    this.auth.login(this.loginData).subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.token); // Save JWT
        this.router.navigate(['/laptops']); // Redirect to main page
      },
      error: () => {
        alert('Login failed');
      }
    });
  }
}
