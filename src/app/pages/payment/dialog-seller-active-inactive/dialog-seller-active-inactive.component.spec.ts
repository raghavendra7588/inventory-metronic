import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSellerActiveInactiveComponent } from './dialog-seller-active-inactive.component';

describe('DialogSellerActiveInactiveComponent', () => {
  let component: DialogSellerActiveInactiveComponent;
  let fixture: ComponentFixture<DialogSellerActiveInactiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogSellerActiveInactiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSellerActiveInactiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
