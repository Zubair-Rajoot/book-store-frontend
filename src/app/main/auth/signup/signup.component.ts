import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
     private toastr: ToastrService

  ) {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

 onSubmit() {
  console.log('Form Values:', this.signupForm.value);
  console.log('Form Valid:', this.signupForm.valid);

  if (this.signupForm.invalid) {
    
    this.toastr.error('Please fill out the form correctly.', 'Signup Failed');
    return;
  }

  this.authService.signup(this.signupForm.value).subscribe({
    next: () => {
       this.toastr.success('You are successfully register!', 'Registered Successful');
      this.router.navigate(['/login']);

    },
    error: (err) => {
      this.errorMessage = err.error.message || 'Signup failed';
    }
  });
}

}