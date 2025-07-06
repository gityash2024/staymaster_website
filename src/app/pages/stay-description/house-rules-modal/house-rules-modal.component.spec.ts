import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseRulesModalComponent } from './house-rules-modal.component';

describe('HouseRulesModalComponent', () => {
  let component: HouseRulesModalComponent;
  let fixture: ComponentFixture<HouseRulesModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HouseRulesModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HouseRulesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
