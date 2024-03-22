import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSafariComponent } from './create-safari.component';

describe('CreateSafariComponent', () => {
  let component: CreateSafariComponent;
  let fixture: ComponentFixture<CreateSafariComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateSafariComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateSafariComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
