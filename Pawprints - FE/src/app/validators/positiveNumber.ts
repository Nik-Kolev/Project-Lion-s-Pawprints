import { AbstractControl, ValidationErrors } from '@angular/forms';

export function positiveNumber() {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (value !== null && value !== undefined && value <= 0) {
      return { notPositive: true };
    }
    return null;
  };
}
