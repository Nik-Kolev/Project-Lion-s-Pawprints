import { FormGroup, ValidatorFn } from '@angular/forms';

export function rePassChecker(pass: string, rePass: string): ValidatorFn {
  return (control) => {
    const group = control as FormGroup;
    return group.get(pass)?.value === group.get(rePass)?.value
      ? null
      : { matchPasswordsValidator: true };
  };
}
