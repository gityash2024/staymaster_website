import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DontWarrySectionComponent } from './dont-warry-section.component';

describe('DontWarrySectionComponent', () => {
  let component: DontWarrySectionComponent;
  let fixture: ComponentFixture<DontWarrySectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DontWarrySectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DontWarrySectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
