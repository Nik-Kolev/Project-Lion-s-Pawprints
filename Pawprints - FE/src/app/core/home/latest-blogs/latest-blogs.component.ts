import { Article } from './../../../services/news.service';
import { Component, OnInit } from '@angular/core';
import { newsService } from '../../../services/news.service';
import { map } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-latest-blogs',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './latest-blogs.component.html',
  styleUrl: './latest-blogs.component.scss',
})
export class LatestBlogsComponent implements OnInit {
  articles: Article[] | undefined;
  constructor(private newsService: newsService) {}

  ngOnInit(): void {
    this.loadArticles();
  }

  loadArticles() {
    this.newsService
      .getSafariNews()
      .pipe(
        map((response) =>
          response.articles
            .slice(1, 4)
            .filter((article) => article.title !== '[Removed]')
        )
      )
      .subscribe({
        next: (articles) => (this.articles = articles),
        error: (error) => console.log(error),
      });
  }
}
