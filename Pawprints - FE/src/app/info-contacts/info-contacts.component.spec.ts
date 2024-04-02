import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoContactsComponent } from './info-contacts.component';

describe('AboutUsComponent', () => {
  let component: InfoContactsComponent;
  let fixture: ComponentFixture<InfoContactsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoContactsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InfoContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
