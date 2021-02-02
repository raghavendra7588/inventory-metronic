import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockInEntryComponent } from './stock-in-entry.component';

describe('StockInEntryComponent', () => {
  let component: StockInEntryComponent;
  let fixture: ComponentFixture<StockInEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockInEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockInEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
