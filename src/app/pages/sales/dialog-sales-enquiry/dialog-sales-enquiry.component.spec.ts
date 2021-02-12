import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSalesEnquiryComponent } from './dialog-sales-enquiry.component';

describe('DialogSalesEnquiryComponent', () => {
  let component: DialogSalesEnquiryComponent;
  let fixture: ComponentFixture<DialogSalesEnquiryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogSalesEnquiryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSalesEnquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
