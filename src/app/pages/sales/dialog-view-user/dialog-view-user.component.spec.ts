import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogViewUserComponent } from './dialog-view-user.component';

describe('DialogViewUserComponent', () => {
  let component: DialogViewUserComponent;
  let fixture: ComponentFixture<DialogViewUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogViewUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogViewUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
