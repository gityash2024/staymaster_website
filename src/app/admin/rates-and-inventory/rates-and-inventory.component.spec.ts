import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatesAndInventoryComponent } from './rates-and-inventory.component';

describe('RatesAndInventoryComponent', () => {
  let component: RatesAndInventoryComponent;
  let fixture: ComponentFixture<RatesAndInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RatesAndInventoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RatesAndInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
