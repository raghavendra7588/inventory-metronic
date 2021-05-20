import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaidOrdersPageComponent } from './paid-orders-page.component';

describe('PaidOrdersPageComponent', () => {
  let component: PaidOrdersPageComponent;
  let fixture: ComponentFixture<PaidOrdersPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaidOrdersPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaidOrdersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
