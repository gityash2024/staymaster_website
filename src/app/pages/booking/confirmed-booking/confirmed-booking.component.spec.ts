import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmedBookingComponent } from './confirmed-booking.component';

describe('ConfirmedBookingComponent', () => {
  let component: ConfirmedBookingComponent;
  let fixture: ComponentFixture<ConfirmedBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmedBookingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmedBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
