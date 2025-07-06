import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAminitieComponent } from './add-aminitie.component';

describe('AddAminitieComponent', () => {
  let component: AddAminitieComponent;
  let fixture: ComponentFixture<AddAminitieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAminitieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAminitieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
