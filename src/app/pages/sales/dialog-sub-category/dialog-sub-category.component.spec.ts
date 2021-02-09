import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSubCategoryComponent } from './dialog-sub-category.component';

describe('DialogSubCategoryComponent', () => {
  let component: DialogSubCategoryComponent;
  let fixture: ComponentFixture<DialogSubCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogSubCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSubCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
