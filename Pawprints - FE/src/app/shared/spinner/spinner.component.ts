import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { SpinnerService } from '../../services/spinner.service';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.scss',
})
export class SpinnerComponent {
  isLoading: Observable<boolean>;

  constructor(private spinnerService: SpinnerService) {
    this.isLoading = this.spinnerService.spinner$;
  }
}
