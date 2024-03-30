import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { HomeComponent } from './core/home/home.component';
import { AuthService } from './services/auth.service';
import { SafariService } from './services/safari.service';
import { SpinnerComponent } from './shared/spinner/spinner.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    SpinnerComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [AuthService, SafariService],
})
export class AppComponent {
  title = 'Pawprints';
}
