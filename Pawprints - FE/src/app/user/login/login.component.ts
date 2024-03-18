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

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: new FormControl('', [
        emailValidator.required,
        emailValidator.isValidEmail,
      ]),
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  onSubmit(): void {
    const trimmedValues = dataTrimmer(this.loginForm.value);
    this.loginForm.setValue(trimmedValues, { emitEvent: false });

    if (this.loginForm.errors) {
      console.log('Form errors', this.loginForm.errors);
    }

    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
    } else {
      Object.keys(this.loginForm.controls).forEach((x) => {
        const formErrors = this.loginForm.get(x)?.errors;
        if (formErrors) {
          console.log(`${x} errors`, formErrors);
        }
      });
    }
  }
}
