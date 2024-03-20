import { Validators } from '@angular/forms';

const emailRegex = new RegExp(
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);

export const emailValidator = {
  required: Validators.required,
  isValidEmail: Validators.pattern(emailRegex),
  minlength: Validators.minLength(8),
};
