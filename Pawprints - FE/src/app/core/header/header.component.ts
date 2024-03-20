import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(private auth: AuthService, private route: Router) {}

  onLogout(e: Event): void {
    e.preventDefault();
    this.auth.logout();
    this.route.navigate(['/']);
  }
}
