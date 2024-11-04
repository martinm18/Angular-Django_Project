// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loginUrl = 'http://127.0.0.1:8000/api/login/';
  private registerUrl = 'http://127.0.0.1:8000/api/register/';

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: { username: string; password: string }): Observable<any> {
    console.log('Attempting to login with', credentials); // Dodajte logiranje
    return this.http
      .post(this.loginUrl, credentials, {
        headers: { 'Content-Type': 'application/json' },
      })
      .pipe(
        tap((response: any) => {
          console.log('Login response:', response);
          this.storeTokens(response.access, response.refresh); // Pohranjivanje tokena
        }),
        catchError((error) => {
          console.error('Login failed', error);
          return throwError(error);
        })
      );
  }

  // Store tokens in localStorage
  storeTokens(access: string, refresh: string): void {
    localStorage.setItem('access', access);
    localStorage.setItem('refresh', refresh);
  }

  // Method to retrieve the access token
  getAccessToken(): string | null {
    return localStorage.getItem('access');
  }

  // Method to retrieve the refresh token
  getRefreshToken(): string | null {
    return localStorage.getItem('refresh');
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }

  register(userData: {
    username: string;
    password: string;
    role: string;
  }): Observable<any> {
    console.log(userData);
    return this.http.post(this.registerUrl, userData);
  }
}
