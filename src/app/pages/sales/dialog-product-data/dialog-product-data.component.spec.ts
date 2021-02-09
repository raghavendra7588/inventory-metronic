import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogProductDataComponent } from './dialog-product-data.component';

describe('DialogProductDataComponent', () => {
  let component: DialogProductDataComponent;
  let fixture: ComponentFixture<DialogProductDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogProductDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogProductDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
