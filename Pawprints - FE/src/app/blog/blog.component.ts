import { Article } from './../services/news.service';
import { Component, OnInit } from '@angular/core';
import { newsService } from '../services/news.service';
import { CommonModule } from '@angular/common';
import { SliceContentPipe } from '../pipes/slice-content.pipe';
import { map } from 'rxjs';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, SliceContentPipe],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss',
})
export class BlogComponent implements OnInit {
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
          response.articles.filter((article) => article.title !== '[Removed]')
        )
      )
      .subscribe({
        next: (articles) => (this.articles = articles),
        error: (error) => console.log(error),
      });
  }
}
