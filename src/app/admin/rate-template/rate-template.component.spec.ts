import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateTemplateComponent } from './rate-template.component';

describe('RateTemplateComponent', () => {
  let component: RateTemplateComponent;
  let fixture: ComponentFixture<RateTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RateTemplateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RateTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
