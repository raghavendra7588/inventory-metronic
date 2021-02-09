import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateOutOfStockComponent } from './update-out-of-stock.component';

describe('UpdateOutOfStockComponent', () => {
  let component: UpdateOutOfStockComponent;
  let fixture: ComponentFixture<UpdateOutOfStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateOutOfStockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateOutOfStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
