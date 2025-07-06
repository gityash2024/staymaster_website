import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutAmenityModalComponent } from './about-amenity-modal.component';

describe('PrivacyPolicyModalComponent', () => {
  let component: AboutAmenityModalComponent;
  let fixture: ComponentFixture<AboutAmenityModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutAmenityModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutAmenityModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
