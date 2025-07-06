import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConceirgeServicesComponent } from './conceirge-services.component';

describe('ConceirgeServicesComponent', () => {
  let component: ConceirgeServicesComponent;
  let fixture: ComponentFixture<ConceirgeServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConceirgeServicesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConceirgeServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
