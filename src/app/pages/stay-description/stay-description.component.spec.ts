import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StayDescriptionComponent } from './stay-description.component';

describe('StayDescriptionComponent', () => {
  let component: StayDescriptionComponent;
  let fixture: ComponentFixture<StayDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StayDescriptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StayDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
