import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodaysOverviewComponent } from './todays-overview.component';

describe('TodaysOverviewComponent', () => {
  let component: TodaysOverviewComponent;
  let fixture: ComponentFixture<TodaysOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodaysOverviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodaysOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
