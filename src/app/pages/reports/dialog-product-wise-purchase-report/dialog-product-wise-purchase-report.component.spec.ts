import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogProductWisePurchaseReportComponent } from './dialog-product-wise-purchase-report.component';

describe('DialogProductWisePurchaseReportComponent', () => {
  let component: DialogProductWisePurchaseReportComponent;
  let fixture: ComponentFixture<DialogProductWisePurchaseReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogProductWisePurchaseReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogProductWisePurchaseReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
