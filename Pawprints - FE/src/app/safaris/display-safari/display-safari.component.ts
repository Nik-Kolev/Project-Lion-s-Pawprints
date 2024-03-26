import { Component, OnInit } from '@angular/core';
import { Safari, SafariService } from '../../services/safari.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-display-safari',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './display-safari.component.html',
  styleUrl: './display-safari.component.scss',
})
export class DisplaySafariComponent implements OnInit {
  currentSafari: Safari | undefined;

  constructor(
    private safariService: SafariService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['safariId'];
    this.safariService.fetchSafariById(id).subscribe({
      next: (safari) => {
        this.currentSafari = safari;
        console.log(safari);
      },
      error: (error) => console.log(error),
    });
  }
}
