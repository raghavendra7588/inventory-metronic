import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnMappedProductsComponent } from './un-mapped-products.component';

describe('UnMappedProductsComponent', () => {
  let component: UnMappedProductsComponent;
  let fixture: ComponentFixture<UnMappedProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnMappedProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnMappedProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
