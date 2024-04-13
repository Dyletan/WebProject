import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

interface Credentials {
  username: string;
  password: string;
}
const url = 'http://127.0.0.1:8000'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: Credentials) {
    return this.http.post<any>(url + '/api/login', credentials);
  }

  register(credentials: Credentials) {
    return this.http.post<any>(url + '/api/register', credentials);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
  
}
