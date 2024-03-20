import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplaySafariComponent } from './display-safari.component';

describe('DisplaySafariComponent', () => {
  let component: DisplaySafariComponent;
  let fixture: ComponentFixture<DisplaySafariComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplaySafariComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DisplaySafariComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
