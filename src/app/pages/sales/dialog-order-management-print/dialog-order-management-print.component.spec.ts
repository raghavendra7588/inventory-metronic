import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogOrderManagementPrintComponent } from './dialog-order-management-print.component';

describe('DialogOrderManagementPrintComponent', () => {
  let component: DialogOrderManagementPrintComponent;
  let fixture: ComponentFixture<DialogOrderManagementPrintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogOrderManagementPrintComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogOrderManagementPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
