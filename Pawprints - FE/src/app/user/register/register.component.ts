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

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group(
      {
        email: new FormControl('', [
          emailValidator.required,
          emailValidator.isValidEmail,
        ]),
        password: ['', Validators.required],
        rePassword: ['', Validators.required],
      },
      { validators: [rePassChecker('password', 'rePassword')] }
    );
  }

  onSubmit(): void {
    const trimmedData = dataTrimmer(this.registerForm.value);
    this.registerForm.setValue(trimmedData, { emitEvent: false });

    if (this.registerForm.errors) {
      console.log('Form errors', this.registerForm.errors);
    }

    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
    } else {
      Object.keys(this.registerForm.controls).forEach((x) => {
        let formErrors = this.registerForm.get(x)?.errors;
        if (formErrors) {
          console.log(`${x} errors`, formErrors);
        }
      });
    }
  }
}
