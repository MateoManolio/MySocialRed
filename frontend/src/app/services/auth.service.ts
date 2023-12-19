import { Injectable, inject } from '@angular/core';
import { User } from '../interfaces/auth';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private api = "http://localhost:3000";


  constructor(private http: HttpClient) { }

  registerUser(userDetails: User) {
    return this.http.post(`${this.api}/users`, userDetails);
  }

  getUserByUsername(dni: String) : Observable<User>{
    return this.http.get <User> (`${this.api}/users/${dni}`);
  }

  deleteUser(username: string): Observable<any> {
    return this.http.delete(`${this.api}/users/${username}`);
  }

}
