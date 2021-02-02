import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductWisePurchaseReportComponent } from './product-wise-purchase-report.component';

describe('ProductWisePurchaseReportComponent', () => {
  let component: ProductWisePurchaseReportComponent;
  let fixture: ComponentFixture<ProductWisePurchaseReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductWisePurchaseReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductWisePurchaseReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
