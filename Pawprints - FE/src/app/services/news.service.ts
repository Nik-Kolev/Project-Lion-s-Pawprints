import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

const { newsURL, newsKey } = environment;

export interface Article {
  source: { id: string | null; name: string };
  author: string;
  title: string;
  urlToImage: string;
  content: string;
  url: string;
}

export interface NewsApiResponse {
  status: string;
  totalResults: number;
  articles: Article[];
}

@Injectable({
  providedIn: 'root',
})
export class newsService {
  constructor(private http: HttpClient) {}

  getSafariNews() {
    return this.http.get<NewsApiResponse>(`${newsURL}${newsKey}`);
  }
}
