import { FormControl, AbstractControl } from '@angular/forms';
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-errors',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './errors.component.html',
  styleUrl: './errors.component.scss',
})
export class ErrorsComponent {
  @Input() control?: FormControl | null | AbstractControl;
  @Input() controlPasswordName!: string;
  private statusChangesSubscription?: Subscription;

  get errors(): string[] {
    const controlErrors: string[] = [];

    if (this.control?.touched) {
      if (this.control?.errors?.['required']) {
        controlErrors.push(`${this.controlName} is required.`);
      }
      if (this.control.errors?.['minlength']) {
        controlErrors.push(
          `${this.controlName} must be at least ${this.control.errors['minlength'].requiredLength} characters.`
        );
      }
      if (this.control.errors?.['patternEmail']) {
        controlErrors.push(
          `${this.controlName} is not valid. e.g. john.doe@gmail.com`
        );
      }

      if (this.control.errors?.['isValidTitle']) {
        controlErrors.push('Example: 3 - Day Zanzibar to Tarangire, ...');
      }

      if (
        this.controlPasswordName === 'rePassword' &&
        this.control.parent &&
        this.control.parent.errors
      ) {
        Object.keys(this.control.parent.errors).forEach((errorKey) => {
          if (errorKey === 'matchPasswordsValidator') {
            controlErrors.push(`Passwords do not match.`);
          }
        });
      }

      if (this.control.errors?.['notPositive']) {
        controlErrors.push(`${this.controlName} should be a positive number.`);
      }

      if (this.control.errors?.['dateRangeInvalid']) {
        controlErrors.push(`The end date can't be before the start date.`);
      }
    }

    return controlErrors;
  }

  get controlName(): string {
    return 'This field';
  }

  ngOnInit(): void {
    this.statusChangesSubscription = this.control?.statusChanges.subscribe(
      () => {}
    );
  }

  ngOnDestroy(): void {
    this.statusChangesSubscription?.unsubscribe();
  }
}
