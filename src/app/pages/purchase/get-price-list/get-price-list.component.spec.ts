import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetPriceListComponent } from './get-price-list.component';

describe('GetPriceListComponent', () => {
  let component: GetPriceListComponent;
  let fixture: ComponentFixture<GetPriceListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetPriceListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetPriceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
