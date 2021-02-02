import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogOrderPrintComponent } from './dialog-order-print.component';

describe('DialogOrderPrintComponent', () => {
  let component: DialogOrderPrintComponent;
  let fixture: ComponentFixture<DialogOrderPrintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogOrderPrintComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogOrderPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
