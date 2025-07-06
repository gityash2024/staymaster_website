import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateThresholdComponent } from './rate-threshold.component';

describe('RateThresholdComponent', () => {
  let component: RateThresholdComponent;
  let fixture: ComponentFixture<RateThresholdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RateThresholdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RateThresholdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
