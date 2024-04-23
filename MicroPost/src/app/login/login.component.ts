import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent{
  credentials = {username: '', password: ''};
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}



  login() {
    if (this.credentials.username && this.credentials.password) {
      this.authService.login(this.credentials).subscribe(
        (res: any) => {
          if (res.access) {
            // store the access token in local storage
            localStorage.setItem('token', res.access);

            this.router.navigate(['/']);
          } else {
            this.errorMessage = 'Failed to login. Username or password is incorrect.';
          }
        },
        (err) => {
          console.error(err);
          this.errorMessage = 'Failed to login. Username or password is incorrect.';
        }
      );
    } else {
      this.errorMessage = 'Username and password cannot be blank.';
    }
  }
}

