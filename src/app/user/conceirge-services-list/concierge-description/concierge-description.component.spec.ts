import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConciergeDescriptionComponent } from './concierge-description.component';

describe('ConciergeDescriptionComponent', () => {
  let component: ConciergeDescriptionComponent;
  let fixture: ComponentFixture<ConciergeDescriptionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConciergeDescriptionComponent]
    });
    fixture = TestBed.createComponent(ConciergeDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
