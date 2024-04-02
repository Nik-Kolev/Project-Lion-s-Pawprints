import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditSafariComponent } from './create-edit-safari.component';

describe('CreateSafariComponent', () => {
  let component: CreateEditSafariComponent;
  let fixture: ComponentFixture<CreateEditSafariComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateEditSafariComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateEditSafariComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
