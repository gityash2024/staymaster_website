import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConceirgeServicesListComponent } from './conceirge-services-list.component';

describe('ConceirgeServicesListComponent', () => {
  let component: ConceirgeServicesListComponent;
  let fixture: ComponentFixture<ConceirgeServicesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConceirgeServicesListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConceirgeServicesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
