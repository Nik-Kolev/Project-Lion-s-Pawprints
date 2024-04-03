import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function dateRangeValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const from = control.get('from')?.value;
    const to = control.get('to')?.value;

    if (from && to && new Date(to) < new Date(from)) {
      return { dateRangeInvalid: true };
    }
    return null;
  };
}
