import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerUserComponent } from './seller-user.component';

describe('SellerUserComponent', () => {
  let component: SellerUserComponent;
  let fixture: ComponentFixture<SellerUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellerUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
