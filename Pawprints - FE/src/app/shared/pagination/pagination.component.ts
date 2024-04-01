import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent implements OnInit {
  currentPage: number = 1;
  @Input() totalPages!: number;
  @Output() pageChange = new EventEmitter<number>();

  constructor(private router: Router, private activeRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activeRoute.queryParams.subscribe((params) => {
      const pageFromUrl = parseInt(params['page'] || '1', 10);
      this.currentPage = pageFromUrl > 0 ? pageFromUrl : 1;
    });
  }

  navigate(page: number) {
    this.currentPage = page;
    this.router.navigate([], { queryParams: { page } });
    this.pageChange.emit(this.currentPage);
  }
}
