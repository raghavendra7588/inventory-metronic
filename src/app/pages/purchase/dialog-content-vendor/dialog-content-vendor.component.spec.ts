import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogContentVendorComponent } from './dialog-content-vendor.component';

describe('DialogContentVendorComponent', () => {
  let component: DialogContentVendorComponent;
  let fixture: ComponentFixture<DialogContentVendorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogContentVendorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogContentVendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
