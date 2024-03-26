import { Component, OnInit } from '@angular/core';
import { Safari, SafariService } from '../../services/safari.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-catalog-safari',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './catalog-safari.component.html',
  styleUrl: './catalog-safari.component.scss',
})
export class CatalogSafariComponent implements OnInit {
  safariList!: Safari[];

  constructor(private safariService: SafariService, private router: Router) {}

  ngOnInit(): void {
    this.safariService.fetchCatalogSafaris().subscribe({
      next: (x) => {
        this.safariList = x;
        console.log(x);
      },
      error: (error) => console.log(error),
    });
  }

  getSafariRateCategory(rate: string): string {
    const formattedRate = parseInt(rate.replace(',', '').replace('.', ''));
    if (formattedRate < 1200) {
      return 'Budget';
    } else if (formattedRate < 2400) {
      return 'Mid-Range';
    } else {
      return 'Luxury';
    }
  }

  navigateToDetails(safariId: string | undefined): void {
    console.log(safariId);
    this.router.navigate([`/safari/${safariId}`]);
  }
}
