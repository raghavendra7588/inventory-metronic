import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogBrandComponent } from './dialog-brand.component';

describe('DialogBrandComponent', () => {
  let component: DialogBrandComponent;
  let fixture: ComponentFixture<DialogBrandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogBrandComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
