import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent{
  credentials = {username: '', password: ''};
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    if (this.credentials.username && this.credentials.password) {
      this.authService.register(this.credentials).subscribe(() => {
        this.router.navigate(['/login']);
      }, err => {
        console.error(err);
        this.errorMessage = 'Failed to register. Please try again.';
      });
    } else {
      this.errorMessage = 'Username and password cannot be blank.';
    }
  }

  protected readonly localStorage = localStorage;
}
