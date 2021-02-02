import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogVendorOrderWisePurchaseReportComponent } from './dialog-vendor-order-wise-purchase-report.component';

describe('DialogVendorOrderWisePurchaseReportComponent', () => {
  let component: DialogVendorOrderWisePurchaseReportComponent;
  let fixture: ComponentFixture<DialogVendorOrderWisePurchaseReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogVendorOrderWisePurchaseReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogVendorOrderWisePurchaseReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
