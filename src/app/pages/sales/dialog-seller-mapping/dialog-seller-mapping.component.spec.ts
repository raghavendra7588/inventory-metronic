import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSellerMappingComponent } from './dialog-seller-mapping.component';

describe('DialogSellerMappingComponent', () => {
  let component: DialogSellerMappingComponent;
  let fixture: ComponentFixture<DialogSellerMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogSellerMappingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSellerMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
