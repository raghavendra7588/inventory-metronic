import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCategoriesMappingComponent } from './dialog-categories-mapping.component';

describe('DialogCategoriesMappingComponent', () => {
  let component: DialogCategoriesMappingComponent;
  let fixture: ComponentFixture<DialogCategoriesMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogCategoriesMappingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCategoriesMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
