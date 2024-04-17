import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Credentials {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = 'http://127.0.0.1:8000/api/'

  constructor(private http: HttpClient) {}

  login(credentials: Credentials) {
    return this.http.post<any>(`${this.url}login`, credentials);
  }

  register(credentials: Credentials) {
    return this.http.post<any>(`${this.url}register`, credentials);
  }

  logout() {
    localStorage.removeItem('token');
  }

}
