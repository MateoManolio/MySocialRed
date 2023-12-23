import { Injectable, inject } from '@angular/core';
import { User } from '../interfaces/auth';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { News } from '../interfaces/news';

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

  getNewsByStudy(study: string): Observable<News[]> {
    return this.http.get<News[]>(`${this.api}/news/`).pipe(
      map((noticias: News[]) => {
        // Filtra las noticias según el estudio
        return noticias.filter(noticia => noticia.study.includes(study) && !noticia.title.includes("null"));

      })
    );
  }

  updateUser(username: string, updatedUserData: Partial<User>): Observable<any> {
    return this.http.put(`${this.api}/users/${username}`, updatedUserData);
  }

}
