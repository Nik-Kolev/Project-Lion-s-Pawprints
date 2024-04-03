import { Safari } from './../../../services/safari.service';
import { Component, OnInit } from '@angular/core';
import { SafariService } from '../../../services/safari.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-top-rated',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './top-rated.component.html',
  styleUrl: './top-rated.component.scss',
})
export class TopRatedComponent implements OnInit {
  safariList!: Array<Safari>;
  activeSafariIndex: number | null = 0;
  constructor(private safariService: SafariService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.safariService.fetchSafariByRating().subscribe({
      next: (x) => (this.safariList = x),
    });
  }

  setActiveSafari(index: number): void {
    this.activeSafariIndex = index;
  }

  safariTag(title: string): string {
    return title
      .split('-')
      .join('')
      .split(' ')
      .slice(0, 5)
      .map((x: string) => x[0])
      .join('');
  }
}
