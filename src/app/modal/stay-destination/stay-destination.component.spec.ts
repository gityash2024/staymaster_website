import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StayDestinationComponent } from './stay-destination.component';

describe('StayDestinationComponent', () => {
  let component: StayDestinationComponent;
  let fixture: ComponentFixture<StayDestinationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StayDestinationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StayDestinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
