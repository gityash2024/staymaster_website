import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AminitiesComponent } from './aminities.component';

describe('AminitiesComponent', () => {
  let component: AminitiesComponent;
  let fixture: ComponentFixture<AminitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AminitiesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AminitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
