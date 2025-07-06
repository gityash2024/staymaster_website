import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealPricingModalComponent } from './meal-pricing-modal.component';

describe('MealPricingModalComponent', () => {
  let component: MealPricingModalComponent;
  let fixture: ComponentFixture<MealPricingModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MealPricingModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MealPricingModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
