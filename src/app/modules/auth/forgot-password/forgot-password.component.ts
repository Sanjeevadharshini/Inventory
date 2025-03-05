import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  forgotForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.forgotForm.invalid) return;

    const { email } = this.forgotForm.value;
    this.authService.forgotPassword(email).subscribe({
      next: (response) => {
        this.successMessage = response.message;
        this.errorMessage = '';
        setTimeout(() => this.router.navigate(['/auth/login']), 3000); // Redirect after 3s
      },
      error: (err) => (this.errorMessage = err.error.message)
    });
  }
}