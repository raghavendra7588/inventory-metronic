import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkProductSellerMappingComponent } from './bulk-product-seller-mapping.component';

describe('BulkProductSellerMappingComponent', () => {
  let component: BulkProductSellerMappingComponent;
  let fixture: ComponentFixture<BulkProductSellerMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BulkProductSellerMappingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkProductSellerMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
