import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogBrandVendorWisePurchaseRoderComponent } from './dialog-brand-vendor-wise-purchase-order.component';

describe('DialogBrandVendorWisePurchaseRoderComponent', () => {
  let component: DialogBrandVendorWisePurchaseRoderComponent;
  let fixture: ComponentFixture<DialogBrandVendorWisePurchaseRoderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogBrandVendorWisePurchaseRoderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogBrandVendorWisePurchaseRoderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
