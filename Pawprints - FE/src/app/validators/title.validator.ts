import { AbstractControl, ValidatorFn } from '@angular/forms';

export function customTitleValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const titleRegex = /^\b([1-9]|1[0-9]|20)\b - Day .*/;
    const valid = titleRegex.test(control.value);
    return valid ? null : { isValidTitle: { value: control.value } };
  };
}
