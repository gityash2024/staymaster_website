import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewPropComponent } from './add-new-prop.component';

describe('AddNewPropComponent', () => {
  let component: AddNewPropComponent;
  let fixture: ComponentFixture<AddNewPropComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewPropComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewPropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
