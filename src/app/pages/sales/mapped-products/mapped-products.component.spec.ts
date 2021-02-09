import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MappedProductsComponent } from './mapped-products.component';

describe('MappedProductsComponent', () => {
  let component: MappedProductsComponent;
  let fixture: ComponentFixture<MappedProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MappedProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MappedProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
