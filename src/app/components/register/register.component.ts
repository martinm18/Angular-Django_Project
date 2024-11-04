import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm: FormGroup;
  submitted = false;
  errorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['customer', Validators.required], // Podrazumijevana uloga
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // Ako forma nije validna, izlazimo
    if (this.registerForm.invalid) {
      return;
    }

    // Poziv servisa za registraciju
    this.authService.register(this.registerForm.value).subscribe(
      (response) => {
        localStorage.setItem('access', response.access); // Store the access token
        localStorage.setItem('refresh', response.refresh); // Store the refresh token
        console.log('Registracija uspješna!', response);
        this.router.navigate(['/login']); // Preusmjeravanje na login stranicu nakon uspješne registracije
      },
      (error) => {
        console.error('Greška prilikom registracije:', error);
        this.errorMessage =
          error.error?.detail || 'Došlo je do greške prilikom registracije.';
      }
    );
  }
}
