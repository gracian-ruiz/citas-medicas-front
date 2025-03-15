import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiBaseUrl = environment.apiBaseUrl; 
  private apiUrl = this.apiBaseUrl + 'login';

  /* private apiUrl = 'http://127.0.0.1:8001/api/login';  */ 
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.getToken() !== null);  

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    console.log('Enviando datos de login:', { email, password });  
    return this.http.post<any>(this.apiUrl, { email, password });
  }

  saveToken(token: string): void {
    localStorage.setItem('auth_token', token);
    this.isLoggedInSubject.next(true);  
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  saveUser(user: any): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;  
  }

  isLoggedIn(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable(); 
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');  
    this.isLoggedInSubject.next(false);  
  }
}
