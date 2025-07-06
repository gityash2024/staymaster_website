import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleMapComponentComponent } from './google-map.component';

describe('GoogleMapComponentComponent', () => {
  let component: GoogleMapComponentComponent;
  let fixture: ComponentFixture<GoogleMapComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoogleMapComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoogleMapComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
