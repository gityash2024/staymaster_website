import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutPropertyModalComponent } from './about-property-modal.component';

describe('PrivacyPolicyModalComponent', () => {
  let component: AboutPropertyModalComponent;
  let fixture: ComponentFixture<AboutPropertyModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutPropertyModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutPropertyModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
