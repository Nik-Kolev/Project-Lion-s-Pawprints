import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopRatedComponent } from './top-rated.component';

describe('TopRatedComponent', () => {
  let component: TopRatedComponent;
  let fixture: ComponentFixture<TopRatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopRatedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TopRatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
