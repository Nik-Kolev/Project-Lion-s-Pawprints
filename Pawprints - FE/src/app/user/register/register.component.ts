import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { emailValidator } from '../../validators/email.validator';
import { rePassChecker } from '../../validators/rePass.validator';
import { dataTrimmer } from '../../shared/trimmer';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { ErrorsComponent } from '../../shared/errors/errors.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, ErrorsComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private toast: ToastrService,
    private route: Router
  ) {
    this.registerForm = this.fb.group({
      email: new FormControl('', [
        emailValidator.required,
        emailValidator.isValidEmail,
      ]),
      passGroup: this.fb.group(
        {
          password: ['', [Validators.required, Validators.minLength(5)]],
          rePassword: ['', [Validators.required, Validators.minLength(5)]],
        },
        {
          validators: [rePassChecker('password', 'rePassword')],
        }
      ),
    });
  }

  onSubmit(): void {
    this.registerForm.markAllAsTouched();

    const trimmedData = dataTrimmer(this.registerForm.value);
    this.registerForm.setValue(trimmedData, { emitEvent: false });

    if (!this.registerForm.valid) {
      return;
    } else {
      this.auth
        .register(
          this.registerForm.value.email,
          this.registerForm.get('passGroup.password')?.value,
          this.registerForm.get('passGroup.rePassword')?.value
        )
        .subscribe({
          next: () => {
            this.toast.success('Registered successfully.');
            this.route.navigate(['/']);
          },
          error: () => {
            this.registerForm.reset();
          },
        });
    }
  }
}
