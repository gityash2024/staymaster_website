import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertiesFilterModalComponent } from './properties-filter-modal.component';

describe('PropertiesFilterModalComponent', () => {
  let component: PropertiesFilterModalComponent;
  let fixture: ComponentFixture<PropertiesFilterModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertiesFilterModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropertiesFilterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
