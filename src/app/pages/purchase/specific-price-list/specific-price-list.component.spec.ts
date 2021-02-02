import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificPriceListComponent } from './specific-price-list.component';

describe('SpecificPriceListComponent', () => {
  let component: SpecificPriceListComponent;
  let fixture: ComponentFixture<SpecificPriceListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecificPriceListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecificPriceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
