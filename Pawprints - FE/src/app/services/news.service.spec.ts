import { TestBed } from '@angular/core/testing';

import { newsService } from './news.service';

describe('NewsService', () => {
  let service: newsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(newsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
