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
      if (this.control.errors?.['pattern']) {
        controlErrors.push(
          `${this.controlName} is not valid. e.g. john.doe@gmail.com`
        );
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
