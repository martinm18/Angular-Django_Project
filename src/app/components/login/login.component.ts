// src/app/components/login/login.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  credentials = { username: '', password: '' };

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.credentials).subscribe(
      (response: any) => {
        // localStorage.setItem('token', response.access);
        this.authService.storeTokens(response.access, response.refresh);
        this.router.navigate(['/products']);
      },
      (error) => {
        console.error('Login failed', error);
      }
    );
  }
}
