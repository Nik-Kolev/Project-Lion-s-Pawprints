import { TestBed } from '@angular/core/testing';

import { SafariService } from './safari.service';

describe('SafariService', () => {
  let service: SafariService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SafariService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
