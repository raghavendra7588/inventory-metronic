import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandVendorWisePurchaseReportComponent } from './brand-vendor-wise-purchase-report.component';

describe('BrandVendorWisePurchaseReportComponent', () => {
  let component: BrandVendorWisePurchaseReportComponent;
  let fixture: ComponentFixture<BrandVendorWisePurchaseReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrandVendorWisePurchaseReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandVendorWisePurchaseReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
