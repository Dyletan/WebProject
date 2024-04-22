import {Injectable} from '@angular/core';
import {jwtDecode} from "jwt-decode";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserDetails} from "../models/user_detail";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url: string = 'http://127.0.0.1:8000/api/'
  constructor(private http: HttpClient) {}

  get_username(): Observable<any>{
    let user_id = this.get_user_id();
    return this.http.get(`${this.url}users/${user_id}`);
  }

  get_username_by_id(id: number): Observable<UserDetails>{
    return this.http.get<UserDetails>(`${this.url}users/${id}`);
  }

  get_user_id() {
    const token = localStorage.getItem('token')
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        return decodedToken.user_id;
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }
}
