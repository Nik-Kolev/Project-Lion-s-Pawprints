import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogSafariComponent } from './catalog-safari.component';

describe('CatalogSafariComponent', () => {
  let component: CatalogSafariComponent;
  let fixture: ComponentFixture<CatalogSafariComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogSafariComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CatalogSafariComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
