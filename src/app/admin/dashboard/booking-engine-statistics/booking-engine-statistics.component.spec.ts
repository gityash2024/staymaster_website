import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingEngineStatisticsComponent } from './booking-engine-statistics.component';

describe('BookingEngineStatisticsComponent', () => {
  let component: BookingEngineStatisticsComponent;
  let fixture: ComponentFixture<BookingEngineStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingEngineStatisticsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingEngineStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
