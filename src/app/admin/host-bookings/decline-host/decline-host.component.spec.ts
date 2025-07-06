import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeclineHostComponent } from './decline-host.component';

describe('DeclineHostComponent', () => {
  let component: DeclineHostComponent;
  let fixture: ComponentFixture<DeclineHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeclineHostComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeclineHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
