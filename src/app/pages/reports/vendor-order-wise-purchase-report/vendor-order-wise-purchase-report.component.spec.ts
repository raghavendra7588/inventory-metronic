import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorOrderWisePurchaseReportComponent } from './vendor-order-wise-purchase-report.component';

describe('VendorOrderWisePurchaseReportComponent', () => {
  let component: VendorOrderWisePurchaseReportComponent;
  let fixture: ComponentFixture<VendorOrderWisePurchaseReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorOrderWisePurchaseReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorOrderWisePurchaseReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
