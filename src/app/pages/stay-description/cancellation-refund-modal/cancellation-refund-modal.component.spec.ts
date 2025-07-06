import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancellationRefundModalComponent } from './cancellation-refund-modal.component';

describe('CancellationRefundModalComponent', () => {
  let component: CancellationRefundModalComponent;
  let fixture: ComponentFixture<CancellationRefundModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CancellationRefundModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CancellationRefundModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
