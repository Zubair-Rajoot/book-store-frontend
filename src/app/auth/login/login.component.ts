import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';


  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],

    });
  }

  onSubmit() {
    
    this.loginForm.markAllAsTouched();




    if (this.loginForm.invalid) {
      
      return;
    }

    this.authService.login(this.loginForm.value).subscribe({
      next: (res: { token: string }) => {
        console.log('Login successful:', res);
        localStorage.setItem('authToken', res.token);
        
        this.router.navigate(['/home']);
      },
      error: (err) => {
      
        this.errorMessage = err.error?.message || 'Login failed. Please check your credentials.';
      },
    });
  }
}