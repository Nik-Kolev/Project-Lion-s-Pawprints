import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { emailValidator } from '../../validators/email.validator';
import { dataTrimmer } from '../../shared/trimmer';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ErrorsComponent } from '../../shared/errors/errors.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule, ErrorsComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private toast: ToastrService,
    private route: Router
  ) {
    this.loginForm = this.fb.group({
      email: new FormControl('', [
        emailValidator.required,
        emailValidator.isValidEmail,
      ]),
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  onSubmit(): void {
    this.loginForm.markAllAsTouched();

    const trimmedValues = dataTrimmer(this.loginForm.value);
    this.loginForm.setValue(trimmedValues, { emitEvent: true });

    if (!this.loginForm.valid) {
      return;
    } else {
      this.auth
        .login(this.loginForm.value.email, this.loginForm.value.password)
        .subscribe({
          next: () => {
            this.toast.success('Logged in successfully.');
            this.route.navigate(['/']);
          },
        });
    }
  }
}
