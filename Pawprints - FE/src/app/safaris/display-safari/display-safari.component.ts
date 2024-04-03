import { Component, OnInit } from '@angular/core';
import { Safari, SafariService } from '../../services/safari.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { displaySafari } from '../../animations';

@Component({
  selector: 'app-display-safari',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './display-safari.component.html',
  styleUrl: './display-safari.component.scss',
  animations: [displaySafari],
})
export class DisplaySafariComponent implements OnInit {
  currentSafari!: Safari | undefined;

  constructor(
    private safariService: SafariService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    window.scrollTo({ top: 0 });
    const id = this.activeRoute.snapshot.params['safariId'];
    this.safariService.fetchSafariById(id).subscribe({
      next: (safari) => {
        this.currentSafari = safari;
      },
      error: (error) => console.log(error),
    });
  }

  get user() {
    return this.authService.user;
  }

  editSafari() {
    this.router.navigate([`editSafari/${this.currentSafari?._id}`]);
  }

  deleteSafari() {
    this.safariService.deleteSafari(this.currentSafari?._id).subscribe({
      next: () => {
        this.router.navigate(['/catalogSafari']);
      },
    });
  }
}
