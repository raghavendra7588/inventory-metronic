import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductVendorWisePurchaseReportComponent } from './product-vendor-wise-purchase-report.component';

describe('ProductVendorWisePurchaseReportComponent', () => {
  let component: ProductVendorWisePurchaseReportComponent;
  let fixture: ComponentFixture<ProductVendorWisePurchaseReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductVendorWisePurchaseReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductVendorWisePurchaseReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
