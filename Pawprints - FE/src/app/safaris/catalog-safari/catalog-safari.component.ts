import { Component, OnInit } from '@angular/core';
import {
  Safari,
  SafariCatalog,
  SafariService,
} from '../../services/safari.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PaginationComponent } from '../../shared/pagination/pagination.component';

@Component({
  selector: 'app-catalog-safari',
  standalone: true,
  imports: [CommonModule, PaginationComponent],
  templateUrl: './catalog-safari.component.html',
  styleUrl: './catalog-safari.component.scss',
})
export class CatalogSafariComponent implements OnInit {
  safariList!: Safari[];
  currentPage: number = 1;
  totalPages!: number;

  constructor(
    private safariService: SafariService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activeRoute.queryParams.subscribe((params) => {
      const pageFromUrl = parseInt(params['page'] || '1', 10);
      this.currentPage = pageFromUrl > 0 ? pageFromUrl : 1;
    });
    this.loadData(this.currentPage);
  }

  navigateToDetails(safariId: string | undefined): void {
    this.router.navigate([`/safari/${safariId}`]);
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.loadData(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  loadData(page: number) {
    this.safariService.fetchCatalogSafaris(page).subscribe({
      next: (data: SafariCatalog) => {
        this.safariList = data.safaris;
        this.totalPages = data.totalNumberOfPages;
        this.currentPage = data.currentPage;

        this.router.navigate([], {
          relativeTo: this.activeRoute,
          queryParams: { page: this.currentPage },
          queryParamsHandling: 'merge',
        });
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
}
