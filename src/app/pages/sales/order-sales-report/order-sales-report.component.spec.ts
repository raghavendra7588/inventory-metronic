import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderSalesReportComponent } from './order-sales-report.component';

describe('OrderSalesReportComponent', () => {
  let component: OrderSalesReportComponent;
  let fixture: ComponentFixture<OrderSalesReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderSalesReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderSalesReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
