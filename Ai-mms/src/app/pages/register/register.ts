import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
registerData = {
  email: '',
  password: '',
  role: 'user' // default
};

onRegister() {
  this.auth.register(this.registerData).subscribe({
    next: () => this.router.navigate(['/login']),
    error: () => alert('Registration failed')
  });
}

}
