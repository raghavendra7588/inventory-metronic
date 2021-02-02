import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPurchaseOrderPrintComponent } from './dialog-purchase-order-print.component';

describe('DialogPurchaseOrderPrintComponent', () => {
  let component: DialogPurchaseOrderPrintComponent;
  let fixture: ComponentFixture<DialogPurchaseOrderPrintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogPurchaseOrderPrintComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogPurchaseOrderPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
