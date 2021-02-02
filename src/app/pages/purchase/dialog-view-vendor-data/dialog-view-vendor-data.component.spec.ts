import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogViewVendorDataComponent } from './dialog-view-vendor-data.component';

describe('DialogViewVendorDataComponent', () => {
  let component: DialogViewVendorDataComponent;
  let fixture: ComponentFixture<DialogViewVendorDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogViewVendorDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogViewVendorDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
