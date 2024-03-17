import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestBlogsComponent } from './latest-blogs.component';

describe('LatestBlogsComponent', () => {
  let component: LatestBlogsComponent;
  let fixture: ComponentFixture<LatestBlogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LatestBlogsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LatestBlogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
