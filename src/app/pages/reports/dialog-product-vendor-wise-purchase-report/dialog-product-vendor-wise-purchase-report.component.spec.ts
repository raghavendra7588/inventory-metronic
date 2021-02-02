import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogProductVendorWisePurchaseReportComponent } from './dialog-product-vendor-wise-purchase-report.component';

describe('DialogProductVendorWisePurchaseReportComponent', () => {
  let component: DialogProductVendorWisePurchaseReportComponent;
  let fixture: ComponentFixture<DialogProductVendorWisePurchaseReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogProductVendorWisePurchaseReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogProductVendorWisePurchaseReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
