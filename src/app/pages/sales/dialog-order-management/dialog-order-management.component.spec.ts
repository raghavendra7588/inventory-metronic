import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogOrderManagementComponent } from './dialog-order-management.component';

describe('DialogOrderManagementComponent', () => {
  let component: DialogOrderManagementComponent;
  let fixture: ComponentFixture<DialogOrderManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogOrderManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogOrderManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
