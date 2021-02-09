import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductMeasurementUnitComponent } from './product-measurement-unit.component';

describe('ProductMeasurementUnitComponent', () => {
  let component: ProductMeasurementUnitComponent;
  let fixture: ComponentFixture<ProductMeasurementUnitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductMeasurementUnitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductMeasurementUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
