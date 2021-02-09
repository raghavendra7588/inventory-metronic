import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogUpdateMobileNumberComponent } from './dialog-update-mobile-number.component';

describe('DialogUpdateMobileNumberComponent', () => {
  let component: DialogUpdateMobileNumberComponent;
  let fixture: ComponentFixture<DialogUpdateMobileNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogUpdateMobileNumberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogUpdateMobileNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
